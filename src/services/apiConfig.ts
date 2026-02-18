/**
 * API Configuration
 * 
 * In a production app, set the BASE_URL to your NestJS backend on Render.
 * For now, we use mock data via Zustand stores.
 */

const API_CONFIG = {
    // Replace with your NestJS Render URL when available
    BASE_URL: 'https://your-nestjs-api.onrender.com',
    TIMEOUT: 10000,
    HEADERS: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

export default API_CONFIG;
