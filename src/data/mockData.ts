import { Publication, Shift, Room, User, DayItem } from '../types/index';

export const mockUser: User = {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'Medical Professional',
};

export const mockPublications: Publication[] = [
    {
        id: '1',
        title: 'Vaccine hesitancy trends',
        description:
            'How do you build stroke risk tools that are both clinically powerful and user-friendly for everyday care?',
        imageUrl:
            'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400&h=250&fit=crop',
        tags: [
            {
                id: '1',
                label: 'Covid',
                color: '#E8F4FD',
                textColor: '#0EA5E9',
            },
            {
                id: '2',
                label: 'Vaccine',
                color: '#FEF3E2',
                textColor: '#F97316',
            },
        ],
        author: {
            id: '1',
            name: 'Elijah Oyindamola',
            avatar:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        },
        publishedDate: '20 Jan 2022',
        readTime: '3mins',
    },
    {
        id: '2',
        title: 'Vaccine hesitancy trends',
        description:
            'How do you build stroke risk tools that are both clinically powerful and user-friendly for everyday care?',
        imageUrl:
            'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400&h=250&fit=crop',
        tags: [
            {
                id: '1',
                label: 'Covid',
                color: '#E8F4FD',
                textColor: '#0EA5E9',
            },
            {
                id: '2',
                label: 'Vaccine',
                color: '#FEF3E2',
                textColor: '#F97316',
            },
        ],
        author: {
            id: '1',
            name: 'Elijah Oyindamola',
            avatar:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        },
        publishedDate: '20 Jan 2022',
        readTime: '3mins',
    },
    {
        id: '3',
        title: 'Understanding mRNA Technology',
        description:
            'A deep dive into how mRNA vaccines work and their potential applications beyond COVID-19.',
        imageUrl:
            'https://images.unsplash.com/photo-1579165466991-467135ad3110?w=400&h=250&fit=crop',
        tags: [
            {
                id: '3',
                label: 'Research',
                color: '#F0FDF4',
                textColor: '#16A34A',
            },
            {
                id: '2',
                label: 'Vaccine',
                color: '#FEF3E2',
                textColor: '#F97316',
            },
        ],
        author: {
            id: '2',
            name: 'Dr. Sarah Chen',
            avatar:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
        },
        publishedDate: '15 Mar 2022',
        readTime: '5mins',
    },
];

export const mockRooms: Room[] = [
    { id: '1', name: 'Room1' },
    { id: '2', name: 'Room2' },
    { id: '3', name: 'Room3' },
];

export const mockShifts: Shift[] = [
    {
        id: '1',
        title: 'OctendedisentShift',
        startTime: '08:30',
        endTime: '20:00',
        timeDisplay: '12:00 - 20:00',
        date: '2024-01-18',
        assignee: {
            id: '1',
            name: 'Omar r.',
            avatar:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
        },
        status: 'Beschikbaar',
        description:
            'Dit is een kamer voor gesprekken tussen chirurgische artsen en patiënten over',
        service: {
            name: 'Ochtend 8:00-12:00',
            time: '8:00-12:00',
            color: '#FF6B35',
        },
        room: {
            name: 'Verkoeverruimte',
            icon: 'building',
        },
        team: [
            {
                id: '1',
                name: 'Omar r., Elijah a.',
                avatar:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
                timeRange: '4:00 - 8:00',
                isHighlighted: false,
            },
            {
                id: '2',
                name: 'Omar r., Elijah a.',
                avatar:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
                timeRange: '8:00 - 12:00',
                isHighlighted: true,
            },
        ],
        notes: [
            {
                id: '1',
                author: 'Omar r',
                avatar:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
                content: 'Medewerker is medisch toegewezen a...',
                timeAgo: '2 min geleden',
            },
            {
                id: '2',
                author: 'Omar r',
                avatar:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
                content: 'Medewerker is medisch toegewezen a...',
                timeAgo: '2 min geleden',
            },
        ],
    },
    {
        id: '2',
        title: 'OctendedisentShift',
        startTime: '09:00',
        endTime: '20:00',
        timeDisplay: '12:00 - 20:00',
        date: '2024-01-18',
        assignee: {
            id: '1',
            name: 'Omar r.',
            avatar:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
        },
        status: 'Beschikbaar',
    },
    {
        id: '3',
        title: 'OctendedisentShift',
        startTime: '09:30',
        endTime: '20:00',
        timeDisplay: '12:00 - 20:00',
        date: '2024-01-18',
        assignee: {
            id: '1',
            name: 'Omar r.',
            avatar:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
        },
        status: 'Beschikbaar',
    },
    {
        id: '4',
        title: 'OctendedisentShift',
        startTime: '10:00',
        endTime: '20:00',
        timeDisplay: '12:00 - 20:00',
        date: '2024-01-18',
        assignee: {
            id: '1',
            name: 'Omar r.',
            avatar:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
        },
        status: 'Beschikbaar',
    },
    {
        id: '5',
        title: 'OctendedisentShift',
        startTime: '10:30',
        endTime: '20:00',
        timeDisplay: '12:00 - 20:00',
        date: '2024-01-18',
        assignee: {
            id: '1',
            name: 'Omar r.',
            avatar:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
        },
        status: 'Beschikbaar',
    },
];

export const generateWeekDays = (selectedDate: Date): DayItem[] => {
    const days: DayItem[] = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Generate 7 days centered around the selected date
    for (let i = -2; i <= 4; i++) {
        const date = new Date(selectedDate);
        date.setDate(selectedDate.getDate() + i);
        days.push({
            date: date.getDate(),
            day: dayNames[date.getDay()] ?? 'Sun',
            isSelected: i === 0,
            hasEvent: Math.random() > 0.5,
            fullDate: date,
        });
    }

    return days;
};
