# React Native Fitness App

A comprehensive fitness workout application built with Expo, React Native, TypeScript, and React Navigation. The app provides structured workout routines with exercise tracking, calorie counting, and progress monitoring.

## Demo

![React Native Fitness App Demo](./readme-images/React-Native-Fitness-App.png)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Navigation Structure](#navigation-structure)
- [State Management](#state-management)
- [Components](#components)
- [Screens](#screens)
- [Data Models](#data-models)
- [Type Definitions](#type-definitions)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)

---

## Tech Stack

### Core Dependencies
- **React**: 19.1.0
- **React Native**: 0.81.5
- **Expo**: ~54.0.33
- **TypeScript**: 5.9.3

### Navigation
- **@react-navigation/native**: 7.1.28
- **@react-navigation/native-stack**: 7.12.0
- **react-native-screens**: 4.16.0
- **react-native-safe-area-context**: 5.6.2

### UI & Icons
- **expo-status-bar**: 3.0.9
- **@expo/vector-icons**: (Ionicons, MaterialCommunityIcons, AntDesign, Octicons)

---

## Project Architecture

### Entry Point: `App.tsx`

The root component wraps the entire application with:
- **FitnessContext**: Global state provider for workout tracking
- **StatusBar**: Configured with light style and black background
- **StackNavigator**: Main navigation container

```typescript
<FitnessContext>
  <StatusBar style="light" backgroundColor='#000' />
  <StackNavigator />
</FitnessContext>
```

---

## Navigation Structure

### Stack Navigator: `StackNavigator.tsx`

Uses **React Navigation Native Stack** with the following screens:

#### Route Parameters Type Definition
```typescript
export type RootStackParamList = {
  Home: undefined;
  Workout: {
    image: string;
    exercises: Exercise[];
    id: string;
  };
  Fit: {
    exercises: Exercise[];
  };
  Rest: undefined;
};
```

#### Navigation Stack
1. **Home** - Main dashboard (no params)
2. **Workout** - Workout details screen (receives image, exercises array, id)
3. **Fit** - Exercise execution screen (receives exercises array)
4. **Rest** - Rest timer screen (no params)

All screens have `headerShown: false` for custom header implementation.

---

## State Management

### Context API: `Context.tsx`

**FitnessContext** provides global state management using React Context and useState hooks.

#### Context State
```typescript
interface FitnessContextType {
  completed: string[];           // Array of completed exercise names
  setCompleted: Dispatch<SetStateAction<string[]>>;
  workout: number;               // Total workouts completed
  setWorkout: Dispatch<SetStateAction<number>>;
  calories: number;              // Total calories burned
  setCalories: Dispatch<SetStateAction<number>>;
  minutes: number;               // Total minutes exercised
  setMinutes: Dispatch<SetStateAction<number>>;
}
```

#### Initial State Values
- `completed`: [] (empty array)
- `workout`: 0
- `calories`: 0
- `minutes`: 0

#### Usage Pattern
```typescript
const context = useContext(FitnessItems);
const { completed, setCompleted, workout, calories, minutes } = context;
```

---

## Components

### FitnessCards Component: `components/FitnessCards.tsx`

**Purpose**: Displays workout category cards on the home screen

#### Props
- None (uses data from `fitness.ts`)

#### Hooks Used
- `useNavigation<NavigationProp>()` - Navigation to Workout screen

#### Features
- Maps through fitness data array
- Displays workout category images with overlay text
- Shows lightning bolt icon for each card
- Navigates to WorkoutScreen with exercise data on press

#### Navigation Call
```typescript
navigation.navigate("Workout", {
  image: item.image,
  exercises: item.exercises,
  id: item.id
})
```

#### Styling
- Full-width images (100%) with 120px height
- 12px border radius
- Absolute positioned text and icons
- 10px vertical margins between cards

---

## Screens

### 1. HomeScreen: `screens/HomeScreen.tsx`

**Purpose**: Main dashboard displaying workout statistics and fitness categories

#### Hooks Used
- `useContext(FitnessItems)` - Access global fitness state
- `useState<boolean>()` - Toggle theme icon

#### State
- `showIcon`: boolean - Controls sun/moon icon display

#### Context Values Used
- `calories` - Total calories burned (displayed with 2 decimal places)
- `workout` - Total workouts completed
- `minutes` - Total minutes exercised

#### UI Components
- **Header Section**: Black background with app title and theme toggle
- **Stats Cards**: Three shadow cards displaying KCAL, WORKOUTS, MINUTES
- **FitnessCards Component**: Scrollable workout categories

#### Styling Features
- ScrollView with hidden vertical indicator
- Shadow cards with elevation (Android) and shadow (iOS)
- Responsive layout with flexbox
- 32% width cards for 3-column layout

---

### 2. WorkoutScreen: `screens/WorkoutScreen.tsx`

**Purpose**: Displays list of exercises for selected workout category

#### Route Params (from RootStackParamList)
```typescript
{
  image: string;        // Workout category image
  exercises: Exercise[]; // Array of exercises
  id: string;           // Workout category ID
}
```

#### Hooks Used
- `useRoute<WorkoutScreenRouteProp>()` - Access route parameters
- `useNavigation<NavigationProp>()` - Navigation control
- `useContext(FitnessItems)` - Access completed exercises

#### Context Values Used
- `completed` - Array of completed exercise names
- `setCompleted` - Reset completed exercises on start

#### Features
- Back button navigation
- Exercise list with images and set counts
- Check marks for completed exercises (AntDesign icon)
- START button to begin workout

#### Navigation Actions
- **Back**: `navigation.goBack()`
- **Start**: Navigate to Fit screen with exercises, reset completed array

#### UI Layout
- Full-width header image (200px height)
- Scrollable exercise list
- Fixed bottom START button with green background

---

### 3. FitScreen: `screens/FitScreen.tsx`

**Purpose**: Exercise execution screen with timer and progress tracking

#### Route Params
```typescript
{
  exercises: Exercise[]; // Array of exercises to perform
}
```

#### Hooks Used
- `useRoute<FitScreenRouteProp>()` - Access exercises array
- `useNavigation<NavigationProp>()` - Screen navigation
- `useContext(FitnessItems)` - Update workout statistics
- `useState<number>()` - Track current exercise index

#### State
- `index`: number - Current exercise position (starts at 0)

#### Context Updates on "DONE"
```typescript
setCompleted([...completed, current.name]);  // Add exercise to completed
setWorkout(workout + 1);                     // Increment workout count
setMinutes(minutes + 2.5);                   // Add 2.5 minutes
setCalories(calories + 6.3);                 // Add 6.3 calories
```

#### Features
- Displays current exercise image (400px height)
- Shows exercise name with question icon
- Displays set count (x{sets})
- DONE button (green) - Marks exercise complete
- PREV button - Go to previous exercise (disabled on first)
- SKIP button - Skip current exercise

#### Navigation Logic
- **DONE (last exercise)**: Navigate to Home
- **DONE (not last)**: Navigate to Rest screen, increment index
- **SKIP (last exercise)**: Navigate to Home
- **SKIP (not last)**: Navigate to Rest screen, increment index
- **PREV**: Navigate to Rest screen, decrement index

#### Timing
All navigation actions use `setTimeout` with 2000ms delay

---

### 4. RestScreen: `screens/RestScreen.tsx`

**Purpose**: Countdown timer screen between exercises

#### Hooks Used
- `useNavigation<NavigationProp>()` - Auto-navigate back
- `useState<number>()` - Countdown timer
- `useEffect()` - Timer logic

#### State
- `timeLeft`: number - Countdown seconds (starts at 2)

#### Timer Logic
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    if (timeLeft <= 0) {
      navigation.goBack();  // Return to FitScreen
    } else {
      setTimeLeft(timeLeft - 1);  // Decrement counter
    }
  }, 1000);  // 1 second interval

  return () => clearTimeout(timer);  // Cleanup
}, [timeLeft, navigation]);
```

#### Features
- Full-width rest image (420px height)
- "TAKE A BREAK!" text
- Timer display with MaterialIcons timer icon
- Auto-navigation back to FitScreen when timer reaches 0

---

## Data Models

### Fitness Data: `data/fitness.ts`

**Type**: `FitnessData[]`

#### Workout Categories (4 total)

1. **FULL BODY** (id: "0")
   - 5 exercises: Jumping Jacks, Inclined Push-ups, Wide Arm Push-ups, Cobra Stretch, Chest Stretch

2. **ABS BEGINNER** (id: "1")
   - 5 exercises: Jumping Jacks, Mountain Climbers, Heel Touch, Plank, Leg Raises

3. **ARM BEGINNER** (id: "2")
   - 7 exercises: Arm Raises, Tricep Dips, Diamond Push-up, Push-ups, Dumbbell Curl, Inch Worms, Tricep Lift

4. **CHEST BEGINNER** (id: "3")
   - 6 exercises: Decline Push-ups, Hindu Push-ups, Shoulder Stretch, Cobra Stretch, Push-up & Rotation, Burpees

#### Data Structure
```typescript
{
  id: string;
  image: string;           // Category image URL
  name: string;            // Category name
  description: string;     // "7x4 CHALLENGE"
  exercises: Exercise[];   // Array of exercises
}
```

---

## Type Definitions

### Types: `types/index.ts`

#### Exercise Interface
```typescript
export interface Exercise {
  id: string;      // Unique exercise identifier
  image: string;   // Exercise GIF URL
  name: string;    // Exercise name (e.g., "JUMPING JACKS")
  sets: number;    // Number of repetitions
}
```

#### FitnessData Interface
```typescript
export interface FitnessData {
  id: string;              // Workout category ID
  image: string;           // Category image URL
  name: string;            // Category name
  description: string;     // Category description
  exercises: Exercise[];   // Array of exercises
}
```

#### FitnessContextType Interface
```typescript
export interface FitnessContextType {
  completed: string[];                                    // Completed exercise names
  setCompleted: React.Dispatch<React.SetStateAction<string[]>>;
  workout: number;                                        // Total workouts
  setWorkout: React.Dispatch<React.SetStateAction<number>>;
  calories: number;                                       // Total calories
  setCalories: React.Dispatch<React.SetStateAction<number>>;
  minutes: number;                                        // Total minutes
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
}
```

---

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional, included in project)

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd react-native-fitness-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run on specific platform**
```bash
npm run android   # Run on Android
npm run ios       # Run on iOS
npm run web       # Run on Web
```

### Available Scripts
- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

---

## Project Structure

```
react-native-fitness-app/
├── .expo/                      # Expo configuration and cache
├── .git/                       # Git repository
├── .vscode/                    # VS Code settings
├── assets/                     # App assets
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash.png
├── components/                 # Reusable components
│   └── FitnessCards.tsx       # Workout category cards
├── data/                       # Static data
│   └── fitness.ts             # Workout and exercise data
├── node_modules/              # Dependencies
├── readme-images/             # README assets
│   └── React-Native-Fitness-App.png
├── screens/                   # Screen components
│   ├── FitScreen.tsx         # Exercise execution screen
│   ├── HomeScreen.tsx        # Main dashboard
│   ├── RestScreen.tsx        # Rest timer screen
│   └── WorkoutScreen.tsx     # Workout details screen
├── types/                     # TypeScript type definitions
│   └── index.ts              # Shared interfaces
├── .gitignore                # Git ignore rules
├── app.json                  # Expo app configuration
├── App.tsx                   # Root component
├── babel.config.js           # Babel configuration
├── Context.tsx               # Global state management
├── package.json              # Dependencies and scripts
├── package-lock.json         # Dependency lock file
├── README.md                 # Project documentation
├── SETUP_CLI.md             # CLI setup guide
├── StackNavigator.tsx       # Navigation configuration
└── tsconfig.json            # TypeScript configuration
```

---

## Key Features Summary

### Navigation Flow
```
Home → Workout → Fit → Rest → (loop back to Fit) → Home
  ↑                                                    ↓
  └────────────────────────────────────────────────────┘
```

### State Management Flow
1. User starts workout from HomeScreen
2. WorkoutScreen displays exercises
3. FitScreen tracks completion and updates context
4. RestScreen provides break between exercises
5. HomeScreen displays updated statistics

### Context Updates
- **Per Exercise Completion**: +1 workout, +2.5 minutes, +6.3 calories
- **Completed Array**: Tracks exercise names for checkmarks
- **Reset**: Completed array cleared when starting new workout

---

## Contact

[LinkedIn](http://linkedin.com/in/yad-e-ali)

---

## License

This project is open source and available for educational purposes.
