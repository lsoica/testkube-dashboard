# Testkube Dashboard - Quick Start

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Agent URL (Optional)

Create `.env.local`:

```env
NEXT_PUBLIC_AGENT_URL=http://localhost:8088/v1
```

Or configure it later in the Settings page of the dashboard.

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

## 🔧 Connecting to Testkube Agent

### If your agent is running in Kubernetes:

```bash
kubectl port-forward svc/testkube-api-server 8088:8088 -n testkube
```

### If you don't have Testkube installed yet:

Follow the [Testkube Standalone Agent installation guide](https://docs.testkube.io/articles/install/standalone-agent)

## 📦 Production Build

```bash
npm run build
npm start
```

## 🐳 Docker Deployment

```bash
docker build -t testkube-dashboard .
docker run -p 3000:3000 -e NEXT_PUBLIC_AGENT_URL=http://your-agent:8088 testkube-dashboard
```

## 📖 Full Documentation

See [README.md](./README.md) for complete documentation, troubleshooting, and advanced features.
