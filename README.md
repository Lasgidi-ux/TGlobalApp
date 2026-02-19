# TGlobal App

A React Native mobile application built with Expo, implementing a healthcare/shift management platform with publications feed. The UI is an exact pixel-faithful implementation of the provided Figma design PNGs.

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

### Running with the NestJS API (optional)

```bash
# 1. In a separate terminal, navigate to the API directory
cd tglobal-api

# 2. Install dependencies
npm install

# 3. Start the API server
npm run start:dev

# 4. The API will be available at http://localhost:3000/api
# Update TGlobalApp/src/services/apiConfig.ts BASE_URL if needed
```

## 📦 Libraries Used

| Library | Purpose |
|---------|---------|
| `expo` (SDK 54) | Development platform & build system |
| `react-native` (0.81.5) | Core UI framework |
| `react` (19.1.0) | Component architecture |
| `@react-navigation/native` | Navigation container |
| `@react-navigation/bottom-tabs` | Bottom tab navigation (4 tabs: Home, Rooster, Publications, Profile) |
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
│   └── TabNavigator.tsx  # Bottom tab navigator with animated icons
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

7. **OTP Screen Removed**: After reviewing the Figma design PNGs, the OTP screen was determined to be outside the scope of the 4-tab navigation (Home, Rooster, Publications, Profile). OTP functionality belongs to an authentication flow that is separate from the main app's tab navigation.

## ✨ Animations & Micro-Interactions

The app implements smooth animations throughout using React Native's `Animated` API:

| Feature | Animation Type | Description |
|---------|---------------|-------------|
| **Tab Bar Icons** | Spring scale + background pill fade | Active tab icons scale up with a spring animation and show a colored pill background |
| **Home Screen Header** | Fade-in + slide-up spring | Welcome header slides in from above with a spring effect on mount |
| **Publication Cards** | Staggered fade-in + slide-up | Each card fades in and slides up with a staggered delay based on its index |
| **Publication Card Press** | Scale spring | Cards scale down to 0.97x on press with a spring bounce-back |
| **Rooster Screen Header** | Fade-in + slide-up | "Mijn rooster" header animates in smoothly on mount |
| **Shift Cards** | Staggered slide-in from right | Each shift card slides in from the right with staggered timing |
| **Shift Card Press** | Scale spring | Shift cards scale down on press for tactile feedback |
| **Date Strip Days** | Scale spring on press | Each day button bounces on press for interactive feel |
| **Shift Detail Sheet** | Custom spring slide-up + backdrop fade + content fade | Bottom sheet slides up with spring physics, backdrop fades in, then content fades in with delay |
| **Profile Screen** | Staggered entrance (header → card → menu) | Three-phase entrance animation: header fades, profile card scales up, menu slides in |
| **Profile Menu Items** | Scale spring on press | Each menu item scales down on press for micro-interaction feedback |

### Design Fidelity

The implementation closely follows the Figma design PNGs:

- **TGLOBAL ASSIGNMENT.png** → Home Screen: Welcome header with user avatar, search bar, publication cards with image, tags, title, description, and author info
- **Mijn rooster.png** → Rooster Screen: Month navigator, horizontal date strip with selected state, room dropdown selector, timeline with shift cards, current time indicator
- **Mijn rooster - Scroling.png** → Shift Detail Sheet: Custom animated bottom sheet with drag handle, time/date info, description, service badge, room info, team members (with highlighted state), and notes section
- **OTP - Waiting.png** → Evaluated and determined to be outside the main app's 4-tab navigation scope (authentication flow)

## 🔌 API Integration

The app is structured for seamless API integration with the companion NestJS backend (`tglobal-api/`):

```
TGlobalApp/src/services/apiConfig.ts  →  Base URL configuration
TGlobalApp/src/services/apiService.ts →  Method stubs ready for real fetch() calls
```

To connect to the NestJS backend:
1. Start the NestJS API: `cd tglobal-api && npm run start:dev`
2. Update `apiConfig.ts`: Set `BASE_URL` to `http://localhost:3000/api`
3. In `apiService.ts`: Uncomment the `this.request()` calls and remove mock returns

## 🎯 What to Know About This Implementation

- The app is **production-ready in structure** but uses mock data. The `apiService.ts` is ready for real endpoint integration.
- The **bottom sheet** for shift details uses a custom `Animated` spring slide-up animation with backdrop fade for a premium feel.
- All screens handle **loading, empty, and error states** gracefully.
- The design tokens in `theme/` make it easy to adjust the entire app's visual identity from a single place.
- The app supports both **iOS and Android** with platform-specific adjustments (tab bar height, safe areas).
- **Smooth animations** are implemented on every interactive element using staggered entrances, spring physics, and press micro-interactions.
