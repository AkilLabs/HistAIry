# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Start Development
```bash
# Start both frontend and backend
npm run dev

# OR start them separately:
npm run dev:backend  # Start server on localhost:5000
npm run dev:frontend # Start Vite dev server
```

### 3. Build & Load Extension
```bash
# Build the extension
npm run build

# Then load the extension in Chrome:
# 1. Go to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select this directory
```

## 🔄 Development Workflow

1. **Make changes** to React components in `frontend/src/`
2. **Build** with `npm run build`
3. **Reload** the extension in Chrome
4. **Test** the new functionality

## 📁 Key Files to Edit

- `frontend/src/App.jsx` - Main app structure
- `frontend/src/components/` - Individual UI components
- `frontend/src/hooks/` - Custom React hooks for state management
- `server/index.js` - Backend API endpoints

## 🎨 Styling

Using Tailwind CSS - edit classes directly in JSX components or modify `frontend/tailwind.config.js` for theme customization.

## 🐛 Troubleshooting

- **Server not running**: Make sure `npm run start:server` is running
- **Extension not loading**: Check Chrome dev tools console for errors
- **Build fails**: Ensure all dependencies are installed with `npm run install:all`
