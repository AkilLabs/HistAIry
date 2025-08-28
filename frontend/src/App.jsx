import React, { useState } from 'react'
import { History, MessageCircle } from 'lucide-react'
import Header from './components/Header'
import HistoryTab from './components/HistoryTab'
import ChatTab from './components/ChatTab'

function App() {
  const [activeTab, setActiveTab] = useState('history')

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-primary-500 to-secondary-500">
      <div className="flex flex-col h-full bg-white">
        <Header />
        
        {/* Main content area with sidebar navigation */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'history' && <HistoryTab />}
            {activeTab === 'chat' && <ChatTab />}
          </div>
          
          {/* Right sidebar navigation */}
          <div className="w-20 bg-gray-50 border-l border-gray-200 flex flex-col">
            <button
              className={`flex-1 py-6 px-2 text-xs font-medium transition-all duration-300 relative flex flex-col items-center justify-center gap-2 ${
                activeTab === 'history'
                  ? 'text-primary-600 bg-white border-l-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('history')}
            >
              <History size={20} />
              <span className="text-center leading-tight">History</span>
              {activeTab === 'history' && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500" />
              )}
            </button>
            
            <button
              className={`flex-1 py-6 px-2 text-xs font-medium transition-all duration-300 relative flex flex-col items-center justify-center gap-2 ${
                activeTab === 'chat'
                  ? 'text-primary-600 bg-white border-l-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('chat')}
            >
              <MessageCircle size={20} />
              <span className="text-center leading-tight">Chat</span>
              {activeTab === 'chat' && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
