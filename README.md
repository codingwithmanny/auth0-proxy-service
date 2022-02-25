# Auth0 Proxy Service

## Requirements

- Node
- Docker

## Host Configurations

```
sudo /etc/hosts;

# 127.0.0.1       www.localdomain.com
# 127.0.0.1       localdomain.com
# 127.0.0.1       sub.localdomain.com
# 127.0.0.1       api.localdomain.com
```
## Local Setup

```bash
docker compose up -d;
```

**NOTE:** To remove instance

```bash
docker compose down --remove-orphans -v;
```

## SSL Certificate Generation

1 - Enter docker

```bash
docker exec -it proxy /bin/sh;
```

2 - Generate SSL certs

```bash
apk add openssl;

openssl req -x509 -nodes -days 365 -subj \
"/C=CA/ST=QC/O=Company, Inc./CN=localdomain.com" \
-addext "subjectAltName=DNS:localdomain.com,DNS:sub.localdomain.com,DNS:www.localdomain.com,DNS:api.localdomain.com" \
-newkey rsa:2048 \
-keyout /tmp/nginx-selfsigned.key -out /tmp/nginx-selfsigned.crt;
```

3 - Modify Nginx Conf

```
apk add nano;
``

```bash
nano default.conf;
```

**File:** `default.conf`

```diff
-    #listen 443 ssl http2 default_server;
-    #listen [::]:443 ssl http2 default_server;
-    #ssl_certificate /tmp/nginx-selfsigned.crt;
-    #ssl_certificate_key /tmp/nginx-selfsigned.key;
+    listen 443 ssl http2 default_server;
+    listen [::]:443 ssl http2 default_server;
+    ssl_certificate /tmp/nginx-selfsigned.crt;
+    ssl_certificate_key /tmp/nginx-selfsigned.key;
```

To save

```bash
ctrl + x;
y;
```

Restart nginx;

```bash
nginx -s reload;
```

## Add SSL To KeyChain

1. Drag `certs/nginx-selfassigned.crt` to your Keychain Access

2. Make sure you set it to fully trusted

## Sub Main Domain Add Auth0 Keys

```
localdomain.com/.env;
sub.localdomain.com/.env;
```

## Build Files

```bash
yarn build;
```

## Serve Files

**NOTE:** If you have to make changes to the SPA React apps you will need to rebuild and re-serve


```bash
# localdomain.com
npx http-server -p 3000 dist;
```

```bash
# sub.localdomain.com
npx http-server -p 3001 dist;
```



