import { OpenAPI } from './generated';

// Configuration for the Testkube Agent API
export const configureAPI = (baseUrl: string) => {
  OpenAPI.BASE = baseUrl;
  console.log('[API Config] OpenAPI.BASE set to:', baseUrl);
};

// Get the API base URL from environment or localStorage
export const getAPIBaseUrl = (): string => {
  // Check if running in browser
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('testkube_agent_url');
    if (stored) return stored;
  }

  // Fallback to environment variable or default
  return process.env.NEXT_PUBLIC_AGENT_URL || 'http://localhost:8088/v1';
};

// Set the API base URL
export const setAPIBaseUrl = (url: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('testkube_agent_url', url);
  }
  configureAPI(url);
};

// Initialize immediately on module load
if (typeof window !== 'undefined') {
  // In browser, check localStorage
  const storedUrl = localStorage.getItem('testkube_agent_url');
  if (storedUrl) {
    configureAPI(storedUrl);
  } else {
    configureAPI(getAPIBaseUrl());
  }
} else {
  // On server, use default
  configureAPI(getAPIBaseUrl());
}
