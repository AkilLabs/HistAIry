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
    <div className="flex flex-col h-full bg-white">
      {/* Chat Actions */}
      <div className="flex gap-3 p-6 border-b border-gray-200">
        <button
          onClick={clearChat}
          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-center text-black hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />
          Clear Chat
        </button>
        
        <button
          onClick={analyzeHistory}
          disabled={loading}
          className="flex-1 px-4 py-3 bg-accent text-black rounded-xl text-sm text-center hover:bg-accent/90 focus:ring-2 focus:ring-accent/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <TrendingUp size={16} />
          Analyze History
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <MessageCircle size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-medium text-black mb-2">Start a Conversation</h3>
            <p className="text-center text-sm text-gray-600 max-w-sm">
              Ask me anything about your browsing history. I can help you find patterns, summarize your activity, or answer specific questions.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 max-w-[80%]">
                  <LoadingSpinner text="Thinking..." />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 flex items-end bg-white border border-gray-300 rounded-xl focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about your browsing history..."
              className="flex-1 bg-transparent border-none outline-none p-4 text-sm text-black resize-none max-h-20 min-h-[20px] placeholder-gray-500"
              rows={1}
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="px-5 py-3 bg-accent text-black rounded-xl hover:bg-accent/90 focus:ring-2 focus:ring-accent/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatTab
