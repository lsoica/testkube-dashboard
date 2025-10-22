# CORS Fix - API Proxy Solution

## Problem
After fixing the API initialization, workflows (and all other API calls) were still failing with "Network Error" even though the Testkube agent was running and properly configured.

## Root Cause
**Cross-Origin Resource Sharing (CORS) blocking**

When the browser tries to call the Testkube agent directly from the dashboard:
- Dashboard runs on: `http://localhost:3000` (Next.js)
- Testkube agent runs on: `http://localhost:8088/v1` (different port)
- Browser blocks the request because they're different origins
- Error: "Network Error" or "CORS policy: No 'Access-Control-Allow-Origin' header"

The Testkube agent doesn't have CORS headers configured to allow cross-origin requests from the dashboard.

## Solution: Next.js API Proxy

Instead of calling the agent directly from the browser, all API requests now go through a Next.js API route that proxies them to the agent.

**Flow:**
```
Browser → /api/proxy/test-workflows → Next.js Server → http://localhost:8088/v1/test-workflows
```

This avoids CORS because:
1. Browser calls `/api/proxy/*` (same origin - no CORS)
2. Next.js server proxies to agent (server-to-server - no CORS)
3. Response flows back through the proxy

## Implementation

### 1. Created API Proxy Route
**File:** `app/api/proxy/[...path]/route.ts`

This catch-all route handles all HTTP methods (GET, POST, PUT, DELETE, PATCH) and forwards them to the Testkube agent.

Key features:
- Accepts agent URL via `x-agent-url` header
- Preserves query parameters
- Forwards request body for POST/PUT/PATCH
- Returns proper error messages
- Logs all proxy requests for debugging

### 2. Updated API Configuration
**File:** `lib/api/config.ts`

Changed to use different URLs for browser vs server:
- **Browser**: Uses `/api/proxy` (avoids CORS)
- **Server**: Calls agent directly (no CORS issues server-to-server)

Added axios interceptor to pass the actual agent URL to the proxy via custom header.

### 3. Enhanced Error Handling
**File:** `app/workflows/page.tsx`

Added clear error messages when API calls fail:
- Shows connection error details
- Provides link to Settings
- Helps users troubleshoot issues

## Files Modified

```
app/api/proxy/[...path]/route.ts          # NEW - API proxy
lib/api/config.ts                          # Modified - proxy routing
app/workflows/page.tsx                     # Modified - error handling
app/settings/page.tsx                      # Modified - show proxy info
lib/providers/query-provider.tsx           # Modified - API initialization
lib/hooks/use-workflows.ts                 # Modified - debug logging
```

## How It Works Now

### 1. On Application Start
```typescript
// lib/providers/query-provider.tsx
useEffect(() => {
  const apiUrl = getAPIBaseUrl(); // e.g., http://localhost:8088/v1
  configureAPI(apiUrl);
  // Browser: OpenAPI.BASE = '/api/proxy'
  // Interceptor adds: headers['x-agent-url'] = 'http://localhost:8088/v1'
}, []);
```

### 2. When Fetching Workflows
```typescript
// lib/hooks/use-workflows.ts
DefaultService.listTestWorkflows()
  ↓
// Generated client makes request to: /api/proxy/test-workflows
  ↓
// Axios interceptor adds header: x-agent-url: http://localhost:8088/v1
  ↓
// app/api/proxy/[...path]/route.ts
// Reads header, forwards to: http://localhost:8088/v1/test-workflows
  ↓
// Returns data back to browser
```

### 3. Request Flow Example
```
GET /api/proxy/test-workflows?selector=...
  ├─ Headers: x-agent-url: http://localhost:8088/v1
  ├─ Proxy forwards to: http://localhost:8088/v1/test-workflows?selector=...
  ├─ Agent responds with workflow list
  └─ Proxy returns response to browser
```

## Testing

### 1. Check Browser Console
You should see:
```
[API Config] Browser: true OpenAPI.BASE: /api/proxy Agent URL: http://localhost:8088/v1
[Testkube] API initialized with base URL: http://localhost:8088/v1
[Testkube] Fetching workflows with selector: undefined
```

### 2. Check Server Logs
You should see:
```
[Proxy] GET http://localhost:8088/v1/test-workflows
```

### 3. Check Network Tab
- Request URL: `http://localhost:3000/api/proxy/test-workflows`
- Status: 200 OK
- Response: JSON array of workflows

### 4. Verify Workflows Page
- Navigate to `/workflows`
- Should see list of workflows
- No "Network Error" messages

## Troubleshooting

### Still Getting "Network Error"?

1. **Check agent is running:**
   ```bash
   curl http://localhost:8088/v1/test-workflows
   ```
   Should return JSON (not connection refused)

2. **Check agent URL in Settings:**
   - Go to Settings page
   - Verify "Agent URL" is correct
   - Should be: `http://localhost:8088/v1` (or your custom URL)

3. **Check proxy is working:**
   ```bash
   # Start the dashboard
   npm run dev

   # In another terminal, test proxy directly
   curl http://localhost:3000/api/proxy/test-workflows
   ```
   Should return workflow list

4. **Check for port forwarding:**
   If agent is in Kubernetes:
   ```bash
   kubectl port-forward svc/testkube-agent 8088:8088 -n testkube
   ```

5. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or clear localStorage and reload

### Proxy Not Forwarding?

Check server console for errors:
```
[Proxy] Error: connect ECONNREFUSED 127.0.0.1:8088
```
This means the agent isn't accessible from the Next.js server.

### Wrong Agent URL?

Update in Settings:
1. Go to Settings page
2. Change "Agent API URL" to correct value
3. Click "Save Changes"
4. Page will refresh automatically

## Benefits of This Approach

✅ **No CORS issues** - Same-origin requests from browser
✅ **No agent changes needed** - Works with any Testkube agent
✅ **Configurable** - Can point to any agent URL
✅ **Works in production** - No localhost hardcoding
✅ **Better security** - Agent doesn't need CORS headers
✅ **Easy debugging** - All requests logged in server console

## Production Deployment

The proxy works in production too:

```env
# .env.production
NEXT_PUBLIC_AGENT_URL=https://testkube.example.com
```

Users access: `https://dashboard.example.com`
Dashboard proxies to: `https://testkube.example.com`
No CORS needed!

---

**Fixed**: 2025-10-22
**Build Status**: ✅ Clean build, no warnings
**New Route**: `/api/proxy/[...path]` (API proxy)
