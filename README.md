# HistAIry - React Edition

![Extension Icon](icon.png)

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
history-extension/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.jsx
│   │   │   ├── HistoryTab.jsx
│   │   │   ├── ChatTab.jsx
│   │   │   ├── HistoryItem.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useHistory.jsx
│   │   │   └── useChat.jsx
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles
│   ├── sidebar.html         # Extension sidebar HTML
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind configuration
│   └── postcss.config.cjs   # PostCSS configuration
├── server/                  # Backend API
│   ├── index.js            # Express server
│   └── package.json        # Backend dependencies
├── dist/                   # Built extension files
├── background.js           # Chrome extension background script
├── manifest.json           # Chrome extension manifest
└── icon.png               # Extension icon
```

## 🚀 Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Google API key for Generative AI (for backend)

### 1. Clone and Setup
```bash
# Clone the repository
git clone <repository-url>
cd history-extension
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../server
npm install
```

### 3. Environment Configuration
Create a `.env` file in the server directory:
```env
GOOGLE_API_KEY=your_google_generative_ai_api_key_here
```

### 4. Development Mode

Start the backend server:
```bash
cd server
node index.js
```

In another terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

The server will run on `http://localhost:5000` and the frontend dev server will run on `http://localhost:5173`.

### 5. Build for Extension

```bash
cd frontend
npm run build
```

This creates optimized files in the `dist/` directory.

## 📦 Installation

### 1. Build the Extension
```bash
cd frontend
npm run build
```

### 2. Load in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `dist/` directory that was created in step 1

### 3. Start the Backend Server
For AI chat functionality to work, start the backend server:
```bash
cd server
node index.js
```

The server must be running on `http://localhost:5000` for the extension to communicate with the AI service.

## 🔧 Available Scripts

### Frontend (in `/frontend` directory)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the extension for production
- `npm run preview` - Preview the built application

### Server (in `/server` directory)
- `node index.js` - Start the Express server
- The server runs on port 5000 by default

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

## � Build Process

1. **Development**: `npm run dev` - Hot reloading for development (frontend only)
2. **Production**: `npm run build` - Optimized build for extension
3. **Preview**: `npm run preview` - Preview the built application
4. **Server**: `node index.js` - Start the backend API server

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

- **Backend Dependency**: The extension requires the backend server to be running on `http://localhost:5000` for AI chat features
- **API Key Required**: Set up your Google Generative AI API key in the server's `.env` file
- **URL Security**: URLs are handled through Chrome extension APIs for proper security
- **React Optimization**: Components are optimized for the extension sidebar size
- **Bundle Optimization**: Tailwind classes are purged for optimal bundle size
- **Development**: Use `npm run dev` in frontend for development, and run `node index.js` in server directory
