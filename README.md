# TGlobal App

A React Native mobile application built with Expo, implementing a healthcare/shift management platform with publications feed.

## 📱 Screenshots

The app implements the provided Figma design with the following screens:

| Home | Rooster | Shift Details | Publications | Profile |
|------|---------|---------------|--------------|---------|
| Welcome screen with publication feed | Schedule view with shift timeline | Bottom sheet with shift details | Searchable publications list | User profile & settings |

## 🚀 How to Run

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npx expo`)
- iOS Simulator (macOS) or Android Emulator

### Steps

```bash
# 1. Navigate to the project directory
cd TGlobalApp

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start

# 4. Run on your target platform
# Press 'i' for iOS Simulator
# Press 'a' for Android Emulator
# Scan the QR code with Expo Go on your physical device
```

## 📦 Libraries Used

| Library | Purpose |
|---------|---------|
| `expo` (SDK 54) | Development platform & build system |
| `react-native` (0.81.5) | Core UI framework |
| `react` (19.1.0) | Component architecture |
| `@react-navigation/native` | Navigation container |
| `@react-navigation/bottom-tabs` | Bottom tab navigation |
| `@react-navigation/native-stack` | Stack navigation |
| `react-native-safe-area-context` | Safe area handling (notch/status bar) |
| `react-native-screens` | Native screen containers |
| `react-native-gesture-handler` | Touch gesture handling |
| `react-native-reanimated` | Performant animations |
| `react-native-svg` | SVG rendering support |
| `@expo/vector-icons` | Icon library (Ionicons) |
| `zustand` | Lightweight state management |
| `typescript` | Type safety |

## 🏗️ Architecture

### Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/           # Shared components (Avatar, SearchBar, TagBadge, StateViews)
│   ├── publications/     # Publication-specific components (PublicationCard)
│   └── schedule/         # Schedule-specific components (DateStrip, ShiftCard, etc.)
├── data/                 # Mock data for development
│   └── mockData.ts       # Publications, shifts, rooms, user data
├── hooks/                # Custom React hooks
│   └── useAppState.ts    # App foreground detection, debounce utility
├── navigation/           # Navigation configuration
│   └── TabNavigator.tsx  # Bottom tab navigator
├── screens/              # Screen components
│   ├── HomeScreen.tsx    # Home/welcome + publications feed
│   ├── RoosterScreen.tsx # Schedule/shift timeline view
│   ├── PublicationsScreen.tsx # Full publications list
│   └── ProfileScreen.tsx # User profile & settings
├── services/             # API layer (prepared for NestJS integration)
│   ├── apiConfig.ts      # API base URL & headers configuration
│   └── apiService.ts     # Service class with endpoint methods
├── store/                # Zustand state management
│   └── index.ts          # Publications, Schedule, and User stores
├── theme/                # Design system tokens
│   ├── colors.ts         # Color palette
│   ├── spacing.ts        # Spacing scale, border radii, shadows
│   └── typography.ts     # Font sizes, weights, text styles
└── types/                # TypeScript type definitions
    └── index.ts          # All app interfaces and types
```

### Architectural Decisions

1. **Zustand for State Management**: Chosen for its minimal boilerplate and simplicity. Three separate stores (Publications, Schedule, User) keep concerns well-isolated while being easy to compose.

2. **Component Hierarchy**: Components are organized by domain (`schedule/`, `publications/`) with truly shared components in `common/`. Each domain folder has a barrel `index.ts` export.

3. **Theme System**: All visual tokens (colors, spacing, border radii, shadows, typography) are centralized in the `theme/` directory. No magic numbers in component styles.

4. **Mock-First Development**: The `services/` layer is structured with a `simulateDelay()` pattern, making it trivial to swap mock data with real API calls when the NestJS backend is ready.

5. **TypeScript Throughout**: Every component, store, and utility is fully typed. Interfaces are co-located in `types/index.ts` for easy discovery.

6. **Edge Case Handling**: All data-fetching screens include Loading, Empty, and Error states using dedicated `StateViews` components.

### Design Fidelity

The implementation closely follows the Figma design:

- **Home Screen**: Welcome header with user avatar, search bar, publication cards with image, tags, title, description, and author info
- **Rooster Screen**: Month navigator, horizontal date strip with selected state, room dropdown selector, timeline with shift cards, current time indicator
- **Shift Detail Sheet**: Modal bottom sheet with drag handle, time/date info, description, service badge, room info, team members (with highlighted state), and notes section
- **Tab Bar**: Custom tab icons with active state pill indicator
- **Profile Screen**: User card, menu sections with icons, logout functionality

## 🎯 What to Know About This Implementation

- The app is **production-ready in structure** but uses mock data. The `apiService.ts` is ready for real endpoint integration.
- The **bottom sheet** for shift details uses a Modal with slide animation. For production, consider integrating `@gorhom/bottom-sheet` for gesture-driven behavior.
- All screens handle **loading, empty, and error states** gracefully.
- The design tokens in `theme/` make it easy to adjust the entire app's visual identity from a single place.
- The app supports both **iOS and Android** with platform-specific adjustments (tab bar height, safe areas).
