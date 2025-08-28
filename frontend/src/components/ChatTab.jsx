import React, { useState, useRef, useEffect } from 'react'
import { Send, Trash2, TrendingUp, MessageCircle } from 'lucide-react'
import { useChat } from '../hooks/useChat'
import Message from './Message'
import LoadingSpinner from './LoadingSpinner'

const ChatTab = () => {
  const [inputValue, setInputValue] = useState('')
  const { messages, loading, sendMessage, clearChat, analyzeHistory } = useChat()
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || loading) return

    await sendMessage(inputValue.trim())
    setInputValue('')
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    
    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 80) + 'px'
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Actions */}
      <div className="flex gap-2 p-4 border-b border-gray-200">
        <button
          onClick={clearChat}
          className="flex-1 px-3 py-2 bg-white border-2 border-gray-200 rounded-lg text-xs text-center hover:border-primary-500 hover:text-primary-600 transition-all duration-200"
        >
          <div className="flex items-center justify-center gap-1">
            <Trash2 size={12} />
            Clear
          </div>
        </button>
        
        <button
          onClick={analyzeHistory}
          disabled={loading}
          className="flex-1 px-3 py-2 bg-white border-2 border-gray-200 rounded-lg text-xs text-center hover:border-primary-500 hover:text-primary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center justify-center gap-1">
            <TrendingUp size={12} />
            Analyze History
          </div>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageCircle size={48} className="mb-3 opacity-50" />
            <p className="text-center text-sm">
              Start a conversation!<br />
              Ask me anything about your browsing history.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 max-w-[80%]">
                  <LoadingSpinner text="Thinking..." />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 flex items-end bg-gray-50 border-2 border-gray-200 rounded-lg focus-within:border-primary-500 transition-colors">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about your browsing history..."
              className="flex-1 bg-transparent border-none outline-none p-3 text-sm resize-none max-h-20 min-h-[20px]"
              rows={1}
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatTab
