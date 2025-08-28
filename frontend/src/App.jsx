import React, { useState } from 'react'
import { History, MessageCircle } from 'lucide-react'
import Header from './components/Header'
import HistoryTab from './components/HistoryTab'
import ChatTab from './components/ChatTab'

function App() {
  const [activeTab, setActiveTab] = useState('history')

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-primary-500 to-secondary-500">
      <div className="flex flex-col h-full bg-white">
        <Header />
        
        {/* Tabs */}
        <div className="flex bg-gray-50 border-b border-gray-200">
          <button
            className={`flex-1 py-4 px-4 text-sm font-medium transition-all duration-300 relative ${
              activeTab === 'history'
                ? 'text-primary-600 bg-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('history')}
          >
            <div className="flex items-center justify-center gap-2">
              <History size={16} />
              <span>History</span>
            </div>
            {activeTab === 'history' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500" />
            )}
          </button>
          
          <button
            className={`flex-1 py-4 px-4 text-sm font-medium transition-all duration-300 relative ${
              activeTab === 'chat'
                ? 'text-primary-600 bg-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageCircle size={16} />
              <span>Chat</span>
            </div>
            {activeTab === 'chat' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'history' && <HistoryTab />}
          {activeTab === 'chat' && <ChatTab />}
        </div>
      </div>
    </div>
  )
}

export default App
