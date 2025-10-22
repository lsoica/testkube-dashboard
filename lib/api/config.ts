import { OpenAPI } from './generated';
import axios from 'axios';

// Store the actual agent URL separately
let agentBaseUrl = 'http://localhost:8088/v1';

// Configuration for the Testkube Agent API
export const configureAPI = (baseUrl: string) => {
  // Store the agent URL for the proxy
  agentBaseUrl = baseUrl;

  // In the browser, use the proxy to avoid CORS issues
  if (typeof window !== 'undefined') {
    OpenAPI.BASE = '/api/proxy';

    // Add interceptor to pass the agent URL to the proxy
    axios.interceptors.request.use((config) => {
      if (config.url?.startsWith('/api/proxy')) {
        config.headers['x-agent-url'] = agentBaseUrl;
      }
      return config;
    });
  } else {
    // On the server, call the agent directly
    OpenAPI.BASE = baseUrl;
  }

  console.log('[API Config] Browser:', typeof window !== 'undefined', 'OpenAPI.BASE:', OpenAPI.BASE, 'Agent URL:', agentBaseUrl);
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

// Get the actual agent URL (for display purposes)
export const getAgentUrl = (): string => {
  return agentBaseUrl;
};

// Set the API base URL
export const setAPIBaseUrl = (url: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('testkube_agent_url', url);
  }
  configureAPI(url);
};
