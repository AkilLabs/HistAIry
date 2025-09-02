import React, { useState, useEffect } from 'react'
import { RefreshCw, Bot, BookOpen } from 'lucide-react'
import { useHistory } from '../hooks/useHistory'
import HistoryItem from './HistoryItem'
import LoadingSpinner from './LoadingSpinner'

const HistoryTab = () => {
  const { history, loading, loadHistory, summarizeHistory, summary, summarizing } = useHistory()

  useEffect(() => {
    loadHistory()
  }, [])

  return (
    <div className="flex flex-col h-full p-6 bg-white">
      {/* Controls */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => loadHistory()}
          disabled={loading}
          className="px-6 py-3 bg-accent text-black rounded-xl text-sm font-medium hover:bg-accent/90 focus:ring-2 focus:ring-accent/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* History List */}
      {/* History List */}
      <div className="flex-1 overflow-y-auto mb-6">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner text="Loading history..." />
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-600">
            <BookOpen size={48} className="mb-3 opacity-50" />
            <p className="text-center text-black">
              No history found for the selected time range.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((item, index) => (
              <HistoryItem key={`${item.url}-${index}`} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="border-t border-gray-200 pt-6">
        <button
          onClick={() => summarizeHistory(history)}
          disabled={summarizing || history.length === 0}
          className="w-full mb-4 px-6 py-3 bg-accent text-black rounded-xl text-sm font-medium hover:bg-accent/90 focus:ring-2 focus:ring-accent/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Bot size={16} />
          {summarizing ? 'Generating Summary...' : 'Generate AI Summary'}
        </button>
        
        <div className="bg-gray-50 rounded-xl p-6 min-h-[80px] flex items-center justify-center text-sm text-black leading-relaxed border border-gray-200">
          {summarizing ? (
            <LoadingSpinner text="Analyzing your browsing patterns..." />
          ) : summary ? (
            <p className="text-center">{summary}</p>
          ) : (
            <p className="text-center text-gray-600">
              Generate an AI-powered summary of your browsing activity to discover patterns and insights.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default HistoryTab
