# Workflow API Connection Fix

## Problem
The workflows page was showing up in the navigation but wasn't listing any workflows, even when workflows existed in Testkube.

## Root Cause
**Two issues were discovered:**

1. **Missing API initialization**: The OpenAPI client requires `configureAPI()` to be called before making API calls, but it was only being called when users manually saved settings.

2. **Incorrect API URL**: The Testkube agent API is at `http://localhost:8088/v1`, not `http://localhost:8088`. The missing `/v1` path was causing all API calls to fail.

## Solution

### 1. Fix API URL Default
**File**: `lib/api/config.ts`

Changed default URL from `http://localhost:8088` to `http://localhost:8088/v1`:
```typescript
export const getAPIBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('testkube_agent_url');
    if (stored) return stored;
  }
  return process.env.NEXT_PUBLIC_AGENT_URL || 'http://localhost:8088/v1';
};
```

### 2. Initialize API on Application Start
**File**: `lib/providers/query-provider.tsx`

Added automatic API initialization:
```typescript
useEffect(() => {
  const apiUrl = getAPIBaseUrl();
  configureAPI(apiUrl);
  console.log('[Testkube] API initialized with base URL:', apiUrl);
}, []);
```

This ensures the API client is configured before any React Query hooks execute.

### 3. Add Error Handling
**File**: `app/workflows/page.tsx`

Added error state handling:
- Shows clear error messages when API calls fail
- Provides link to Settings page
- Displays actual error for debugging

### 4. Add Debug Logging
**File**: `lib/hooks/use-workflows.ts`

Added console logging:
- Logs when workflow fetch is initiated
- Logs successful fetches with count
- Logs detailed error information

## How to Test

1. **Start the dashboard:**
   ```bash
   npm run dev
   ```

2. **Check browser console:**
   - Should see: `[Testkube] API initialized with base URL: http://localhost:8088/v1`
   - Should see: `[Testkube] Fetching workflows with selector: undefined`
   - Should see: `[Testkube] Workflows fetched successfully: X workflows`

3. **Verify workflows load:**
   - Navigate to `/workflows`
   - If agent is running and has workflows, they should now appear
   - If agent is not running, you'll see a helpful error message

4. **Check API URL:**
   - Go to Settings → verify the API URL is correct
   - Default is `http://localhost:8088/v1`
   - Update if your Testkube agent is running on a different URL/port

## Expected Behavior Now

✅ API is initialized on every page load
✅ Workflows fetch from the correct endpoint
✅ Console logs help debug connection issues
✅ User-friendly error messages if connection fails
✅ No more silent failures

## Troubleshooting

If workflows still don't show:

1. **Check Testkube agent is running:**
   ```bash
   kubectl port-forward svc/testkube-agent 8088:8088 -n testkube
   ```

2. **Verify agent URL in browser console:**
   - Should see: `[Testkube] API initialized with base URL: <your-url>`

3. **Check for CORS issues:**
   - Testkube agent should allow requests from dashboard origin
   - Check browser Network tab for blocked requests

4. **Verify workflows exist:**
   ```bash
   kubectl get testworkflows -n testkube
   ```

5. **Check agent API directly:**
   ```bash
   curl http://localhost:8088/v1/test-workflows
   ```

---

**Fixed**: 2025-10-22
**Build Status**: ✅ All routes building successfully
