# Deployment Guide

## Quick Deploy Options

### Option 1: Development Mode (Fastest)

```bash
npm install
npm run dev
```

Access at `http://localhost:3000`

### Option 2: Production Build (Recommended)

```bash
npm install
npm run build
npm start
```

Access at `http://localhost:3000`

### Option 3: Docker (Best for Production)

```bash
docker build -t testkube-dashboard .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_AGENT_URL=http://your-testkube-agent:8088 \
  testkube-dashboard
```

Access at `http://localhost:3000`

### Option 4: Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  testkube-dashboard:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_AGENT_URL=http://testkube-api-server:8088
    networks:
      - testkube

networks:
  testkube:
    external: true
```

Run: `docker-compose up -d`

## Environment Configuration

### Required Variables

- `NEXT_PUBLIC_AGENT_URL` - URL of your Testkube agent API
  - Default: `http://localhost:8088/v1`
  - Example: `http://testkube.example.com:8088`

### Configuration Methods

1. **Environment file** (`.env.local`):
   ```env
   NEXT_PUBLIC_AGENT_URL=http://localhost:8088/v1
   ```

2. **Settings page**: Configure URL in the dashboard Settings page

3. **Docker runtime**: Pass as `-e` flag or in docker-compose

## Kubernetes Deployment

### Using Kubectl

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: testkube-dashboard
  namespace: testkube
spec:
  replicas: 2
  selector:
    matchLabels:
      app: testkube-dashboard
  template:
    metadata:
      labels:
        app: testkube-dashboard
    spec:
      containers:
      - name: dashboard
        image: testkube-dashboard:latest
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_AGENT_URL
          value: "http://testkube-api-server:8088"
---
apiVersion: v1
kind: Service
metadata:
  name: testkube-dashboard
  namespace: testkube
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: testkube-dashboard
```

Apply: `kubectl apply -f testkube-dashboard.yaml`

### Using Helm

Create a Helm chart or use the manifests above.

## Reverse Proxy Setup

### Nginx

```nginx
server {
    listen 80;
    server_name testkube-dashboard.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Traefik

```yaml
http:
  routers:
    testkube-dashboard:
      rule: "Host(`testkube-dashboard.example.com`)"
      service: testkube-dashboard
  services:
    testkube-dashboard:
      loadBalancer:
        servers:
          - url: "http://localhost:3000"
```

## Cloud Deployments

### Vercel

```bash
npm install -g vercel
vercel --prod
```

Set environment variable in Vercel dashboard.

### AWS (ECS/Fargate)

1. Push Docker image to ECR
2. Create ECS task definition
3. Deploy service with environment variables

### Google Cloud Run

```bash
gcloud run deploy testkube-dashboard \
  --image gcr.io/PROJECT_ID/testkube-dashboard \
  --platform managed \
  --set-env-vars NEXT_PUBLIC_AGENT_URL=http://your-agent:8088
```

## Monitoring & Logs

### View Application Logs

**Docker:**
```bash
docker logs -f testkube-dashboard
```

**Kubernetes:**
```bash
kubectl logs -f deployment/testkube-dashboard -n testkube
```

### Health Check

The app runs on port 3000. Check health:
```bash
curl http://localhost:3000
```

## Troubleshooting

### Can't connect to agent

1. Check agent URL in Settings
2. Verify agent is accessible: `curl http://agent-url:8088`
3. Check CORS settings on agent
4. Verify network connectivity

### Build fails

1. Clear cache: `rm -rf .next node_modules`
2. Reinstall: `npm install`
3. Rebuild: `npm run build`

### Docker issues

1. Check logs: `docker logs testkube-dashboard`
2. Verify image built: `docker images | grep testkube`
3. Check port mapping: `docker ps`

## Security Considerations

1. **Use HTTPS in production** - Set up SSL/TLS
2. **Secure agent connection** - Use private networks
3. **Environment variables** - Don't commit `.env.local`
4. **Access control** - Use reverse proxy auth if needed
5. **Keep dependencies updated** - Run `npm audit` regularly

## Performance Optimization

1. **Enable caching** - Use CDN for static assets
2. **Compress responses** - Enable gzip in reverse proxy
3. **Use production build** - Always use `npm run build`
4. **Monitor resources** - Track CPU and memory usage
5. **Scale horizontally** - Run multiple replicas in Kubernetes

---

For questions or issues, see [README.md](./README.md) or open an issue on GitHub.
