import { useState } from 'react'

export const useHistory = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState('')
  const [summarizing, setSummarizing] = useState(false)

  const getStartTime = (range) => {
    const now = Date.now()
    const oneHour = 1000 * 60 * 60
    switch (range) {
      case '1h': return now - oneHour
      case '24h': return now - (oneHour * 24)
      case '7d': return now - (oneHour * 24 * 7)
      case '30d': return now - (oneHour * 24 * 30)
      default: return now - (oneHour * 24)
    }
  }

  const loadHistory = async (range = '24h') => {
    setLoading(true)
    try {
      const startTime = getStartTime(range)
      
      if (typeof chrome !== 'undefined' && chrome.history) {
        chrome.history.search(
          { text: '', startTime: startTime, maxResults: 100 },
          (items) => {
            setHistory(items || [])
            setLoading(false)
          }
        )
      } else {
        // Fallback for development
        setHistory([])
        setLoading(false)
      }
    } catch (error) {
      console.error('Error loading history:', error)
      setHistory([])
      setLoading(false)
    }
  }

  const summarizeHistory = async (historyItems) => {
    if (!historyItems || historyItems.length === 0) {
      setSummary('No history to summarize.')
      return
    }

    setSummarizing(true)
    try {
      const historyText = historyItems
        .map(item => `${item.title || 'Untitled'} - ${item.url}`)
        .join('\n')

      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: historyText })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setSummary(data.summary)
    } catch (error) {
      console.error('Summarize error:', error)
      setSummary('❌ Error generating summary. Please make sure the server is running.')
    } finally {
      setSummarizing(false)
    }
  }

  return {
    history,
    loading,
    summary,
    summarizing,
    loadHistory,
    summarizeHistory
  }
}
