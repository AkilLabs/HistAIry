import React, { useState } from 'react'
import { History, MessageCircle } from 'lucide-react'
import HistoryTab from './components/HistoryTab'
import ChatTab from './components/ChatTab'

function App() {
  const [activeTab, setActiveTab] = useState('history')

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Modern Header with Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img src="/icon.png" alt="HistAIry" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-black">HistAIry</h1>
              <p className="text-xs text-gray-600">Your intelligent browsing companion</p>
            </div>
          </div>
          
          {/* Top Right Navigation */}
          <nav className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-accent text-black shadow-sm'
                  : 'text-black hover:text-black hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('history')}
            >
              <History size={16} />
              History
            </button>
            
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'chat'
                  ? 'bg-accent text-black shadow-sm'
                  : 'text-black hover:text-black hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('chat')}
            >
              <MessageCircle size={16} />
              Chat
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'history' && <HistoryTab />}
        {activeTab === 'chat' && <ChatTab />}
      </div>
    </div>
  )
}

export default App
