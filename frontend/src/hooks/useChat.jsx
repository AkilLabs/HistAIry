import { useState, useRef } from 'react'

export const useChat = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const sessionIdRef = useRef('session_' + Date.now())

  const getCurrentHistory = async () => {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.history) {
        const now = Date.now()
        const startTime = now - (1000 * 60 * 60 * 24) // Last 24 hours
        
        chrome.history.search(
          { text: '', startTime: startTime, maxResults: 20 },
          (items) => {
            resolve(items || [])
          }
        )
      } else {
        resolve([])
      }
    })
  }

  const sendMessage = async (message) => {
    if (loading || !message.trim()) return

    setLoading(true)
    
    // Add user message
    const userMessage = { content: message, isUser: true }
    setMessages(prev => [...prev, userMessage])

    try {
      const historyContext = await getCurrentHistory()
      
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          sessionId: sessionIdRef.current,
          historyContext
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Add assistant response
      const assistantMessage = { content: data.response, isUser: false }
      setMessages(prev => [...prev, assistantMessage])
      
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        content: '❌ Sorry, I encountered an error. Please make sure the server is running and try again.',
        isUser: false
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const clearChat = async () => {
    setMessages([])
    
    try {
      await fetch(`http://localhost:5000/chat/${sessionIdRef.current}`, {
        method: 'DELETE'
      })
    } catch (error) {
      console.error('Error clearing chat:', error)
    }
    
    // Generate new session ID
    sessionIdRef.current = 'session_' + Date.now()
  }

  const analyzeHistory = async () => {
    const historyContext = await getCurrentHistory()
    
    if (historyContext.length === 0) {
      const message = {
        content: 'Please load some browsing history first from the History tab, then I can analyze it for you.',
        isUser: false
      }
      setMessages(prev => [...prev, message])
      return
    }

    const analysisPrompt = 'Please analyze my recent browsing history and provide insights about my browsing patterns, interests, and productivity.'
    await sendMessage(analysisPrompt)
  }

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
    analyzeHistory
  }
}
