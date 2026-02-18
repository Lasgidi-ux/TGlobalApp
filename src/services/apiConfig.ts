/**
 * API Configuration
 * 
 * For local development, the NestJS backend runs on http://localhost:3000/api.
 * For production, replace BASE_URL with your NestJS Render deployment URL.
 */

const API_CONFIG = {
    // Local dev: 'http://localhost:3000/api'
    // Production: 'https://your-nestjs-api.onrender.com/api'
    BASE_URL: 'http://localhost:3000/api',
    TIMEOUT: 10000,
    HEADERS: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

export default API_CONFIG;
