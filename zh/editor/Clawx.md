---
title: ClawX
icon: code
---

1. 打开 clawx 软件 点击模型 > 点击添加供应商
   <img src="/images/clawx/1.png" />

2. 选择自定义
   <img src="/images/clawx/2.png" />

3. 填写 api key 和 base url
   <img src="/images/clawx/3.png" />

4. 点击添加 即可成功使用

curl 'http://8.135.41.212:3377/v1/chat/completions'
-H 'Authorization: Bearer sk-PykRnzhZbbAsx7Vwlu4DjNYZu0Zh4IbLQkmKDHD4ngrUnLrZ'
-H 'Content-Type: application/json'
-d '{
"model": "gpt-4o-mini",
"messages": [
{
"role": "user",
"content": "What is the meaning of life?"
}
]
}'

curl 'https://www.dmxapi.cn/v1/chat/completions'
-H 'Authorization: Bearer sk-PykRnzhZbbAsx7Vwlu4DjNYZu0Zh4IbLQkmKDHD4ngrUnLrZ'
-H 'Content-Type: application/json'
-d '{
"model": "gpt-4o-mini",
"messages": [
{
"role": "user",
"content": "What is the meaning of life?"
}
]
}'


server {
    listen 3377;
    server_name localhost; # 或者你的服务器域名/IP

    # 开启日志记录，方便排查 API 调用问题
    access_log /var/log/nginx/dmx_access.log;
    error_log /var/log/nginx/dmx_error.log;

    location /yuwu/ {
        # 1. 核心转发设置
        proxy_pass https://api3.wlai.vip/;
        
        # 2. 必须透传的 Host 头
        # 注意：目标服务器通常根据 Host 决定分发逻辑，这里设置为目标域名
        proxy_set_header Host www.dmxapi.cn;
        
        # 3. 透传客户端真实 IP
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # 4. 关键配置：支持流式输出 (Streaming)
        # 大模型调用通常是 SSE (Server-Sent Events)，必须关闭缓存
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_buffering off;
        proxy_cache off;
        
        # 5. 超时设置
        # 大模型推理时间较长，建议增加超时时间，防止 504 错误
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
        proxy_connect_timeout 60s;

        # 6. 允许客户端上传较大的 Body (比如长文本输入)
        client_max_body_size 50m;
    }
}

docker run -d \
  --name nginx \
  -p 80:80 \
  -p 443:443 \
  -p 3377:3377 \
  -p 3388:3388 \
  -v /var/lib/docker/volumes/nginx/_data/conf.d:/etc/nginx/conf.d \
  -v /var/lib/docker/volumes/nginx/_data/html:/usr/share/nginx/html \
  nginx:latest