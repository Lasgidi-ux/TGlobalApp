// Navigation types
export type RootTabParamList = {
    Home: undefined;
    Rooster: undefined;
    Publications: undefined;
    Profile: undefined;
};

export type RootStackParamList = {
    MainTabs: undefined;
    ShiftDetails: { shiftId: string };
};

// Data types
export interface User {
    id: string;
    name: string;
    avatar: string;
    role: string;
}

export interface Publication {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: Tag[];
    author: Author;
    publishedDate: string;
    readTime: string;
}

export interface Tag {
    id: string;
    label: string;
    color: string;
    textColor: string;
}

export interface Author {
    id: string;
    name: string;
    avatar: string;
}

export interface DayItem {
    date: number;
    day: string;
    isSelected: boolean;
    hasEvent: boolean;
    fullDate: Date;
}

export interface Shift {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    timeDisplay: string;
    date: string;
    assignee: TeamMember;
    status: string;
    description?: string;
    service?: ShiftService;
    room?: ShiftRoom;
    team?: TeamMember[];
    notes?: ShiftNote[];
}

export interface ShiftService {
    name: string;
    time: string;
    color: string;
}

export interface ShiftRoom {
    name: string;
    icon: string;
}

export interface TeamMember {
    id: string;
    name: string;
    avatar: string;
    timeRange?: string;
    isHighlighted?: boolean;
}

export interface ShiftNote {
    id: string;
    author: string;
    avatar: string;
    content: string;
    timeAgo: string;
}

export interface Room {
    id: string;
    name: string;
}
