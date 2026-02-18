import API_CONFIG from './apiConfig';
import { Publication, Shift } from '../types';
import { mockPublications, mockShifts } from '../data/mockData';

/**
 * API Service layer
 *
 * Currently returns mock data. When the NestJS backend is ready,
 * swap the mock implementations with actual fetch() calls.
 */

class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
    }

    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        try {
            const response = await fetch(url, {
                headers: API_CONFIG.HEADERS,
                ...options,
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    }

    // ============ Publications ============
    async getPublications(): Promise<Publication[]> {
        // TODO: Replace with actual API call
        // return this.request<Publication[]>('/publications');
        await this.simulateDelay(800);
        return mockPublications;
    }

    async getPublicationById(id: string): Promise<Publication | undefined> {
        await this.simulateDelay(300);
        return mockPublications.find((pub) => pub.id === id);
    }

    async searchPublications(query: string): Promise<Publication[]> {
        await this.simulateDelay(500);
        const lowerQuery = query.toLowerCase();
        return mockPublications.filter(
            (pub) =>
                pub.title.toLowerCase().includes(lowerQuery) ||
                pub.description.toLowerCase().includes(lowerQuery)
        );
    }

    // ============ Shifts ============
    async getShifts(date?: string): Promise<Shift[]> {
        // TODO: Replace with actual API call
        // return this.request<Shift[]>(`/shifts?date=${date}`);
        await this.simulateDelay(500);
        return mockShifts;
    }

    async getShiftById(id: string): Promise<Shift | undefined> {
        await this.simulateDelay(300);
        return mockShifts.find((shift) => shift.id === id);
    }

    // ============ Helpers ============
    private simulateDelay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

export const apiService = new ApiService();
