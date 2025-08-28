# HistAIry - React Edition

A modern Chrome extension built with React, Vite, and Tailwind CSS for browsing history management and AI-powered chat assistance.

## 🎯 Features

- **Modern React UI**: Built with React 18 and Vite for fast development and optimized builds
- **Tailwind CSS**: Beautiful, responsive design with modern styling
- **History Management**: View and interact with your browsing history across different time ranges
- **AI Chat Assistant**: Intelligent conversation about your browsing patterns
- **Clickable URLs**: All URLs open in new tabs when clicked
- **Real-time Analysis**: Get insights about your browsing habits
- **Clean Architecture**: Component-based structure with custom hooks

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Node.js + Express + Google Generative AI
- **Build Tool**: Vite with Chrome Extension optimizations

## 📁 Project Structure

```
histAIry/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.jsx
│   │   │   ├── HistoryTab.jsx
│   │   │   ├── ChatTab.jsx
│   │   │   ├── HistoryItem.jsx
│   │   │   ├── Message.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useHistory.jsx
│   │   │   └── useChat.jsx
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles
│   ├── popup.html           # Extension popup HTML
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   └── tailwind.config.js   # Tailwind configuration
├── server/                  # Backend API
│   ├── index.js            # Express server
│   └── package.json        # Backend dependencies
├── dist/                   # Built extension files
├── manifest.json           # Chrome extension manifest
└── icon.png               # Extension icon
```

## 🚀 Development Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../server
npm install
```

### 2. Development Mode

```bash
# Start the backend server
cd server
node index.js

# In another terminal, start the frontend development server
cd frontend
npm run dev
```

### 3. Build for Extension

```bash
cd frontend
npm run build:extension
```

This creates optimized files in the `dist/` directory.

## 📦 Installation

### 1. Build the Extension
```bash
cd frontend
npm run build:extension
```

### 2. Load in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the root directory (`histAIry/`)

### 3. Start the Backend
```bash
cd server
node index.js
```

## 🎨 Components Overview

### Core Components

- **App.jsx**: Main application with tab management
- **Header.jsx**: Beautiful gradient header with branding
- **HistoryTab.jsx**: History viewing and AI summary functionality
- **ChatTab.jsx**: Interactive chat interface
- **HistoryItem.jsx**: Individual history item with clickable URLs
- **Message.jsx**: Chat message with URL parsing and formatting
- **LoadingSpinner.jsx**: Reusable loading indicator

### Custom Hooks

- **useHistory**: Manages browsing history state and API calls
- **useChat**: Handles chat functionality and conversation state

## 🎯 Key Features

### URL Handling
- All URLs are properly parsed and made clickable
- URLs open in new tabs using Chrome extension APIs
- No duplicate URL display issues
- Proper URL formatting with visual indicators

### Modern UI/UX
- Smooth animations and transitions
- Responsive design that works in the extension popup
- Loading states and error handling
- Clean, modern aesthetic with gradients and shadows

### Chat Intelligence
- Context-aware responses using browsing history
- Conversation history persistence
- Real-time typing indicators
- Auto-resizing text input

## 🔧 Configuration

### Vite Configuration
The `vite.config.js` is optimized for Chrome extensions:
- Outputs to `../dist` directory
- Configured for ES2015 target compatibility
- Optimized bundle splitting and naming

### Tailwind Configuration
Custom theme with:
- Primary/secondary color schemes
- Custom animations (fade-in, slide-up)
- Extension-specific responsive breakpoints

## 🚀 Build Process

1. **Development**: `npm run dev` - Hot reloading for development
2. **Production**: `npm run build:extension` - Optimized build for extension
3. **Preview**: `npm run preview` - Preview the built application

## 📊 Performance

- **Bundle Size**: ~158KB (gzipped: ~51KB)
- **CSS Size**: ~12KB (gzipped: ~3KB)
- **Load Time**: Near-instant popup opening
- **Memory Usage**: Optimized React tree with minimal re-renders

## 🔮 Future Enhancements

- **TypeScript**: Add TypeScript for better type safety
- **Testing**: Unit and integration tests with React Testing Library
- **Themes**: Multiple color themes and dark mode
- **Export**: Export chat conversations and history summaries
- **Offline**: Offline capability with service workers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes in the React components
4. Test the extension functionality
5. Submit a pull request

## 📝 Notes

- The extension requires the backend server to be running for AI features
- URLs are handled through Chrome extension APIs for proper security
- React components are optimized for the extension popup size (400x600px)
- Tailwind classes are purged for optimal bundle size
