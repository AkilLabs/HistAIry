import React, { useState } from 'react'
import { History, , Clock } from 'lucide-react'
import HistoryTab from './components/HistoryTab'
import ChatTab from './components/ChatTab'

function App() {
  const [activeTab, setActiveTab] = useState('history')

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Modern Header with Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Clock size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">History Assistant</h1>
              <p className="text-xs text-gray-500">Your intelligent browsing companion</p>
            </div>
          </div>
          
          {/* Top Right Navigation */}
          <nav className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('history')}
            >
              <History size={16} />
              History
            </button>
            
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'chat'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
