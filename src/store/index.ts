import { create } from 'zustand';
import { Publication, Shift, Room, User, DayItem } from '../types/index';
import {
    mockPublications,
    mockShifts,
    mockRooms,
    mockUser,
    generateWeekDays,
} from '../data/mockData';

// ============ Publications Store ============
interface PublicationsState {
    publications: Publication[];
    searchQuery: string;
    isLoading: boolean;
    error: string | null;
    setSearchQuery: (query: string) => void;
    fetchPublications: () => Promise<void>;
    filteredPublications: () => Publication[];
}

export const usePublicationsStore = create<PublicationsState>((set, get) => ({
    publications: [],
    searchQuery: '',
    isLoading: false,
    error: null,

    setSearchQuery: (query: string) => set({ searchQuery: query }),

    fetchPublications: async () => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 800));
            set({ publications: mockPublications, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch publications', isLoading: false });
        }
    },

    filteredPublications: () => {
        const { publications, searchQuery } = get();
        if (!searchQuery.trim()) return publications;
        const query = searchQuery.toLowerCase();
        return publications.filter(
            (pub) =>
                pub.title.toLowerCase().includes(query) ||
                pub.description.toLowerCase().includes(query) ||
                pub.tags.some((tag) => tag.label.toLowerCase().includes(query))
        );
    },
}));

// ============ Schedule Store ============
interface ScheduleState {
    shifts: Shift[];
    rooms: Room[];
    selectedRoom: Room;
    selectedDate: Date;
    weekDays: DayItem[];
    currentMonth: string;
    isLoading: boolean;
    error: string | null;
    selectedShift: Shift | null;
    isShiftDetailVisible: boolean;

    setSelectedRoom: (room: Room) => void;
    setSelectedDate: (date: Date) => void;
    navigateMonth: (direction: 'prev' | 'next') => void;
    selectDay: (day: DayItem) => void;
    fetchShifts: () => Promise<void>;
    openShiftDetail: (shift: Shift) => void;
    closeShiftDetail: () => void;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
    shifts: [],
    rooms: mockRooms,
    selectedRoom: mockRooms[0]!,
    selectedDate: new Date(2024, 0, 18), // Jan 18, 2024
    weekDays: generateWeekDays(new Date(2024, 0, 18)),
    currentMonth: 'January, 2024',
    isLoading: false,
    error: null,
    selectedShift: null,
    isShiftDetailVisible: false,

    setSelectedRoom: (room: Room) => set({ selectedRoom: room }),

    setSelectedDate: (date: Date) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
        set({
            selectedDate: date,
            weekDays: generateWeekDays(date),
            currentMonth: `${monthNames[date.getMonth()]}, ${date.getFullYear()}`,
        });
    },

    navigateMonth: (direction: 'prev' | 'next') => {
        const { selectedDate } = get();
        const newDate = new Date(selectedDate);
        if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        get().setSelectedDate(newDate);
    },

    selectDay: (day: DayItem) => {
        get().setSelectedDate(day.fullDate);
    },

    fetchShifts: async () => {
        set({ isLoading: true, error: null });
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            set({ shifts: mockShifts, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch shifts', isLoading: false });
        }
    },

    openShiftDetail: (shift: Shift) =>
        set({ selectedShift: shift, isShiftDetailVisible: true }),

    closeShiftDetail: () =>
        set({ selectedShift: null, isShiftDetailVisible: false }),
}));

// ============ User Store ============
interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: mockUser,
    isAuthenticated: true,

    setUser: (user: User) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
}));
