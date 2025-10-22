# 🚀 Testkube Dashboard - Start Here!

Welcome to your new open-source Testkube Dashboard! This dashboard provides a modern web UI for the Testkube standalone agent.

## ⚡ Quick Start (30 seconds)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open your browser
# Visit http://localhost:3000
```

**That's it!** Configure your agent URL in Settings → Connect to your Testkube agent.

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get up and running in 3 steps
- **[README.md](./README.md)** - Complete documentation and features
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guides
- **[BUILD_SUMMARY.md](./BUILD_SUMMARY.md)** - Technical implementation details

## 🎯 What You Get

✅ **Dashboard** - Real-time stats and recent executions
✅ **Tests Management** - Create, view, execute, and delete tests  
✅ **Executions** - Monitor test runs with live logs
✅ **Test Suites** - Manage collections of tests
✅ **Settings** - Configure agent connection
✅ **And more** - Webhooks, executors, sources, triggers (UI ready)

## 🔧 Connect to Testkube Agent

### If running locally with port-forward:
```bash
kubectl port-forward svc/testkube-api-server 8088:8088 -n testkube
```

### If not installed yet:
Follow: https://docs.testkube.io/articles/install/standalone-agent

## 🐳 Production Deployment

### Using Docker:
```bash
docker build -t testkube-dashboard .
docker run -p 3000:3000 testkube-dashboard
```

### Using npm:
```bash
npm run build
npm start
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Kubernetes, cloud deployments, and more.

## 📁 Project Structure

```
testkube-dashboard/
├── app/              # Next.js pages and routes
│   ├── page.tsx      # Dashboard home
│   ├── tests/        # Tests management
│   ├── executions/   # Execution monitoring
│   ├── test-suites/  # Test suites
│   └── settings/     # Configuration
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   └── layout/      # Layout components
├── lib/
│   ├── api/         # API client (auto-generated)
│   ├── hooks/       # React Query hooks
│   └── providers/   # React providers
└── public/          # Static assets
```

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **TanStack Query** - Data fetching
- **Auto-generated API** - From OpenAPI spec

## ✨ Key Features

### Real-time Updates
- Live log streaming (3-second polling)
- Auto-refresh execution status
- Toast notifications

### Developer Experience
- Full TypeScript coverage
- Type-safe API calls
- Hot reload in development
- Production optimized builds

### User Experience
- Responsive design
- Loading states
- Error handling
- Search and filtering

## 🎓 Common Tasks

### Run in development:
```bash
npm run dev
```

### Build for production:
```bash
npm run build
```

### Run production build:
```bash
npm start
```

### Run linter:
```bash
npm run lint
```

## 🆘 Need Help?

1. **Can't connect to agent?**
   - Check Settings → Agent Configuration
   - Verify port forwarding: `kubectl port-forward ...`
   - See [README.md](./README.md) troubleshooting section

2. **Build errors?**
   - Clear cache: `rm -rf .next node_modules`
   - Reinstall: `npm install && npm run build`

3. **Want to customize?**
   - See [README.md](./README.md) for development guide
   - Components in `components/ui/`
   - API hooks in `lib/hooks/`

## 🚦 Next Steps

1. ✅ Start the dev server
2. ✅ Configure agent URL in Settings
3. ✅ Explore the dashboard
4. ✅ Run your first test
5. ✅ Monitor executions

## 🎉 You're All Set!

Your Testkube Dashboard is ready to use. Connect it to your agent and start managing your Kubernetes-native tests!

---

**Questions?** Check [README.md](./README.md) or open an issue on GitHub.

**Built with** ❤️ **using** Next.js, TypeScript, and modern web technologies.
