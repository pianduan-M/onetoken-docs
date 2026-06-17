import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const rootDir = process.cwd();
const contentDirs = ["zh", "en"];
const imageRoot = path.join(rootDir, "images");
const execFileAsync = promisify(execFile);

const imageUrlPattern =
  /!\[[^\]]*]\((https?:\/\/[^\s)]+)\)|<img\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["'][^>]*>/g;

const contentTypeExtensions = new Map([
  ["image/avif", ".avif"],
  ["image/bmp", ".bmp"],
  ["image/gif", ".gif"],
  ["image/jpeg", ".jpg"],
  ["image/jpg", ".jpg"],
  ["image/png", ".png"],
  ["image/svg+xml", ".svg"],
  ["image/webp", ".webp"],
]);

const pathExtensions = new Set([
  ".avif",
  ".bmp",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);

async function main() {
  const files = [];
  for (const dir of contentDirs) {
    await collectMarkdownFiles(path.join(rootDir, dir), files);
  }

  const documents = new Map();
  let matchedFiles = 0;
  let matchedReferences = 0;

  for (const filePath of files.sort()) {
    const source = await readFile(filePath, "utf8");
    const references = collectImageReferences(source);

    if (references.length === 0) {
      continue;
    }

    matchedFiles += 1;
    matchedReferences += references.length;

    const docName = path.basename(filePath).replace(/\.(md|mdx)$/i, "");
    if (!documents.has(docName)) {
      documents.set(docName, []);
    }

    documents.get(docName).push({
      filePath,
      source,
      references,
    });
  }

  let downloaded = 0;
  let skipped = 0;
  let writtenFiles = 0;
  const failures = [];
  const imageDirs = await getExistingImageDirs();

  for (const [docName, entries] of documents) {
    const imageDirName = chooseImageDirName(docName, imageDirs);
    const primaryReferences = entries[0].references;
    const imageDir = path.join(imageRoot, imageDirName);
    await mkdir(imageDir, { recursive: true });
    imageDirs.set(imageDirName.toLowerCase(), {
      name: imageDirName,
      tracked: false,
    });

    const localPaths = new Array(primaryReferences.length);
    let hasDownloadFailure = false;

    for (let index = 0; index < primaryReferences.length; index += 1) {
      const reference = primaryReferences[index];
      const sequence = index + 1;

      try {
        const result = await downloadImage({
          url: reference.url,
          dataPath: reference.dataPath,
          imageDir,
          sequence,
        });

        localPaths[index] = `/images/${imageDirName}/${sequence}${result.extension}`;

        if (result.downloaded) {
          downloaded += 1;
        } else {
          skipped += 1;
        }
      } catch (error) {
        hasDownloadFailure = true;
        failures.push({
          docName,
          sequence,
          url: reference.url,
          message: error instanceof Error ? error.message : String(error),
        });
      }
    }

    if (hasDownloadFailure) {
      continue;
    }

    for (const entry of entries) {
      if (!sameUrlSequence(primaryReferences, entry.references)) {
        failures.push({
          docName,
          filePath: relativePath(entry.filePath),
          message: "Image URL sequence differs from the first document with the same basename.",
        });
        continue;
      }

      const nextSource = replaceImageUrls(entry.source, entry.references, localPaths);
      if (nextSource !== entry.source) {
        await writeFile(entry.filePath, nextSource);
        writtenFiles += 1;
      }
    }
  }

  console.log(`Matched files: ${matchedFiles}`);
  console.log(`Matched image references: ${matchedReferences}`);
  console.log(`Document image directories: ${documents.size}`);
  console.log(`Downloaded images: ${downloaded}`);
  console.log(`Skipped existing images: ${skipped}`);
  console.log(`Updated files: ${writtenFiles}`);

  if (failures.length > 0) {
    console.error("\nFailures:");
    for (const failure of failures) {
      console.error(
        `- ${failure.docName}${failure.sequence ? ` #${failure.sequence}` : ""}: ${failure.message}`,
      );
      if (failure.url) {
        console.error(`  ${failure.url}`);
      }
      if (failure.filePath) {
        console.error(`  ${failure.filePath}`);
      }
    }
    process.exitCode = 1;
  }
}

async function collectMarkdownFiles(dir, files) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await collectMarkdownFiles(entryPath, files);
      continue;
    }

    if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      files.push(entryPath);
    }
  }
}

async function getExistingImageDirs() {
  const dirs = new Map();

  try {
    const entries = await readdir(imageRoot, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        dirs.set(entry.name.toLowerCase(), {
          name: entry.name,
          tracked: false,
        });
      }
    }
  } catch (error) {
    if (!error || error.code !== "ENOENT") {
      throw error;
    }
  }

  try {
    const { stdout } = await execFileAsync("git", ["ls-files", "images"], {
      cwd: rootDir,
      maxBuffer: 1024 * 1024,
    });

    for (const filePath of stdout.split(/\r?\n/)) {
      const [, dirName] = filePath.split("/");
      if (dirName) {
        dirs.set(dirName.toLowerCase(), {
          name: dirName,
          tracked: true,
        });
      }
    }
  } catch {
    // Git metadata is optional; filesystem dirs are enough outside a checkout.
  }

  return dirs;
}

function chooseImageDirName(docName, imageDirs) {
  const existingDir = imageDirs.get(docName.toLowerCase());

  if (!existingDir) {
    return docName;
  }

  if (existingDir.name === docName && !existingDir.tracked) {
    return docName;
  }

  let candidate = `${docName}-doc`;
  let index = 2;
  while (imageDirs.has(candidate.toLowerCase())) {
    candidate = `${docName}-doc-${index}`;
    index += 1;
  }

  return candidate;
}

function collectImageReferences(source) {
  const references = [];
  imageUrlPattern.lastIndex = 0;
  let match;

  while ((match = imageUrlPattern.exec(source)) !== null) {
    const fullMatch = match[0];
    const url = match[1] ?? match[2];

    references.push({
      fullMatch,
      url,
      dataPath: extractDataPath(fullMatch),
    });
  }

  return references;
}

function extractDataPath(source) {
  const match = /\bdata-path=["']([^"']+)["']/.exec(source);
  return match?.[1];
}

async function downloadImage({ url, dataPath, imageDir, sequence }) {
  const initialExtension = inferExtension({ url, dataPath });
  let targetPath = path.join(imageDir, `${sequence}${initialExtension}`);

  if (await hasContent(targetPath)) {
    return { downloaded: false, extension: initialExtension };
  }

  const image = await fetchImageWithFallback(url);
  const contentType = image.contentType?.split(";")[0]?.trim().toLowerCase();
  const responseExtension = contentTypeExtensions.get(contentType) ?? initialExtension;

  if (responseExtension !== initialExtension) {
    targetPath = path.join(imageDir, `${sequence}${responseExtension}`);
    if (await hasContent(targetPath)) {
      return { downloaded: false, extension: responseExtension };
    }
  }

  const bytes = image.bytes;
  if (bytes.length === 0) {
    throw new Error("Downloaded an empty image.");
  }

  await writeFile(targetPath, bytes);
  return { downloaded: true, extension: responseExtension };
}

async function fetchImageWithFallback(url) {
  const errors = [];

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await fetchImage(url);
    } catch (error) {
      errors.push(error);
      await sleep(500 * attempt);
    }
  }

  try {
    return await curlImage(url);
  } catch (error) {
    errors.push(error);
    const messages = errors.map((item) => (item instanceof Error ? item.message : String(item)));
    throw new Error(messages.join("; "));
  }
}

async function fetchImage(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "onetoken-doc-image-localizer/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  return {
    bytes: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get("content-type"),
  };
}

async function curlImage(url) {
  const tempDir = await mkdtemp(path.join(tmpdir(), "onetoken-doc-images-"));
  const headersPath = path.join(tempDir, "headers.txt");
  const bodyPath = path.join(tempDir, "image");

  try {
    await execFileAsync(
      "curl",
      [
        "-L",
        "--fail",
        "--silent",
        "--show-error",
        "--max-time",
        "90",
        "--dump-header",
        headersPath,
        "--output",
        bodyPath,
        url,
      ],
      { maxBuffer: 1024 * 1024 },
    );

    const [headers, bytes] = await Promise.all([readFile(headersPath, "utf8"), readFile(bodyPath)]);

    return {
      bytes,
      contentType: parseFinalHeader(headers, "content-type"),
    };
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

function parseFinalHeader(headers, name) {
  const pattern = new RegExp(`^${name}:\\s*([^\\r\\n]+)`, "gim");
  const matches = [...headers.matchAll(pattern)];
  return matches.at(-1)?.[1];
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function hasContent(filePath) {
  try {
    const result = await stat(filePath);
    return result.isFile() && result.size > 0;
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

function inferExtension({ url, dataPath }) {
  const candidates = [dataPath, getUrlPathname(url)];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    const extension = path.extname(candidate).toLowerCase();
    if (pathExtensions.has(extension)) {
      return extension === ".jpeg" ? ".jpg" : extension;
    }
  }

  return ".png";
}

function getUrlPathname(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return undefined;
  }
}

function sameUrlSequence(primaryReferences, references) {
  return (
    primaryReferences.length === references.length &&
    primaryReferences.every((reference, index) => reference.url === references[index].url)
  );
}

function replaceImageUrls(source, references, localPaths) {
  let nextSource = source;

  for (let index = references.length - 1; index >= 0; index -= 1) {
    const reference = references[index];
    nextSource = replaceLastWithinMatch(nextSource, reference.fullMatch, reference.url, localPaths[index]);
  }

  return nextSource;
}

function replaceLastWithinMatch(source, fullMatch, oldUrl, newUrl) {
  const matchIndex = source.lastIndexOf(fullMatch);
  if (matchIndex === -1) {
    throw new Error(`Could not find image reference while replacing ${oldUrl}`);
  }

  const before = source.slice(0, matchIndex);
  const after = source.slice(matchIndex + fullMatch.length);
  return `${before}${fullMatch.replace(oldUrl, newUrl)}${after}`;
}

function relativePath(filePath) {
  return path.relative(rootDir, filePath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
