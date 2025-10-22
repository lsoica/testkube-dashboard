# Testkube Dashboard

An open-source web dashboard for the [Testkube](https://github.com/kubeshop/testkube) standalone agent. This project provides a modern, user-friendly interface for managing and monitoring your Kubernetes-native testing infrastructure.

## Overview

After Testkube maintainers removed the dashboard from their open-source offering, only the standalone agent remained as OSS. This project fills that gap by providing a comprehensive dashboard UI built with modern web technologies.

## Features

- **Dashboard Overview** - Real-time statistics and recent execution results
- **Test Management** - Create, view, execute, and delete tests
- **Test Suites** - Manage collections of tests
- **Execution Monitoring** - Real-time execution logs and status tracking
- **Artifacts Browser** - View and download test artifacts
- **Webhooks** - Configure HTTP callbacks for test events
- **Executors** - Manage test execution engines
- **Test Sources** - Connect Git repositories for test definitions
- **Triggers** - Set up event-based test automation
- **Agent Configuration** - Flexible API endpoint configuration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: TanStack Query (React Query)
- **API Client**: Auto-generated from OpenAPI spec
- **Charts**: Recharts
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ (built and tested with Node 18.19.1)
- npm or yarn
- A running Testkube standalone agent (see [installation guide](https://docs.testkube.io/articles/install/standalone-agent))

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd testkube-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the agent URL (optional)

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_AGENT_URL=http://localhost:8088/v1
```

If you don't set this, the dashboard defaults to `http://localhost:8088/v1`. You can also configure this later in the Settings page.

### 4. Start the development server

```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`.

## Configuration

### Agent Connection

The dashboard needs to connect to your Testkube agent API. You can configure this in three ways:

1. **Environment variable** (recommended for deployment):
   ```env
   NEXT_PUBLIC_AGENT_URL=http://your-testkube-agent:8088
   ```

2. **Settings page**: Navigate to Settings in the dashboard and enter your agent URL

3. **Default**: If not configured, defaults to `http://localhost:8088/v1`

### Port Forwarding (Local Development)

If your Testkube agent is running in Kubernetes, you can use port forwarding:

```bash
kubectl port-forward svc/testkube-api-server 8088:8088 -n testkube
```

## Building for Production

### Build the application

```bash
npm run build
```

### Start the production server

```bash
npm start
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t testkube-dashboard .
docker run -p 3000:3000 -e NEXT_PUBLIC_AGENT_URL=http://your-agent:8088 testkube-dashboard
```

## Development

### Project Structure

```
testkube-dashboard/
├── app/                      # Next.js app directory
│   ├── (routes)/            # Application routes
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Dashboard home page
├── components/
│   ├── layout/              # Layout components (Sidebar, Header)
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── api/
│   │   ├── generated/       # Auto-generated API client
│   │   └── config.ts        # API configuration
│   ├── hooks/               # Custom React hooks
│   └── providers/           # React providers (Query, etc.)
└── public/                  # Static assets
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

The dashboard uses React Query for data fetching. To add a new feature:

1. **Create API hooks** in `lib/hooks/`:
   ```typescript
   export function useYourResource() {
     return useQuery({
       queryKey: ['your-resource'],
       queryFn: () => YourService.list(),
     });
   }
   ```

2. **Create a page** in `app/your-route/page.tsx`

3. **Add navigation** in `components/layout/sidebar.tsx`

### Regenerating API Client

If the Testkube API changes, regenerate the client:

```bash
# Download latest OpenAPI spec
curl -o openapi.yaml https://docs.testkube.io/assets/files/testkube-agent-openapi-<hash>.yaml

# Regenerate client
npx openapi-typescript-codegen --input openapi.yaml --output lib/api/generated --client axios
```

## Architecture

### State Management

- **Server State**: TanStack Query handles all API data fetching, caching, and synchronization
- **Client State**: React hooks for local UI state
- **Configuration**: localStorage for user preferences (API URL)

### API Communication

The dashboard communicates with the Testkube agent via REST API:

1. OpenAPI spec is used to generate TypeScript types and API client
2. Axios is used as the HTTP client
3. React Query manages caching and real-time updates
4. Automatic polling for running executions

### Real-time Updates

- Execution logs auto-refresh every 3 seconds while running
- Manual refresh button in header invalidates all queries
- Optimistic updates for mutations

## Troubleshooting

### Dashboard can't connect to agent

1. Check the agent URL in Settings
2. Verify the agent is running: `kubectl get pods -n testkube`
3. Check port forwarding: `kubectl port-forward svc/testkube-api-server 8088:8088 -n testkube`
4. Check browser console for CORS errors

### Tests not showing up

1. Verify tests exist: `kubectl get tests -n testkube`
2. Check agent logs: `kubectl logs -n testkube deployment/testkube-api-server`
3. Try the refresh button in the header

### Build errors

1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Node version: `node --version` (should be 18+)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Follow the existing code style
2. Use TypeScript for type safety
3. Add proper error handling
4. Test with a real Testkube agent
5. Update README if adding new features

## Roadmap

- [ ] Test creation/editing forms
- [ ] Advanced filtering and search
- [ ] Metrics and analytics visualization
- [ ] Test workflow support
- [ ] Dark mode
- [ ] Export execution reports
- [ ] Bulk operations
- [ ] User authentication (optional)

## License

MIT

## Acknowledgments

- [Testkube](https://github.com/kubeshop/testkube) - The amazing test orchestration platform
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Next.js](https://nextjs.org/) - The React framework

## Support

For issues related to:
- **This dashboard**: Open an issue in this repository
- **Testkube agent**: Visit [Testkube GitHub](https://github.com/kubeshop/testkube)
- **Testkube docs**: Check [official documentation](https://docs.testkube.io/)

---

Built with ❤️ for the open-source community
