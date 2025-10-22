# Workflow API Connection Fix

## Problem
The workflows page was showing up in the navigation but wasn't listing any workflows, even when workflows existed in Testkube.

## Root Cause
**The API URL was never being initialized on application startup.**

The OpenAPI client (`lib/api/generated`) requires the base URL to be configured before making any API calls. However, the `configureAPI()` function was only being called when users manually saved settings in the Settings page.

This meant:
- On first load, all API calls would fail silently
- The workflows endpoint (`GET /test-workflows`) was never actually being called
- No error messages were shown to users

## Files Changed

### 1. `/lib/providers/query-provider.tsx`
**Added API initialization on mount:**
```typescript
useEffect(() => {
  const apiUrl = getAPIBaseUrl();
  configureAPI(apiUrl);
  console.log('[Testkube] API initialized with base URL:', apiUrl);
}, []);
```

This ensures the API client is configured with the correct base URL (from localStorage or default) before any React Query hooks execute.

### 2. `/app/workflows/page.tsx`
**Added error state handling:**
- Destructured `error` and `isError` from `useWorkflows()` hook
- Added error UI showing connection issues
- Provides helpful message directing users to check Settings
- Shows actual error message for debugging

### 3. `/lib/hooks/use-workflows.ts`
**Added debug logging:**
- Logs when workflow fetch is initiated
- Logs successful fetches with workflow count
- Logs detailed error information to console

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
