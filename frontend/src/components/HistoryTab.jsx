import React, { useState, useEffect } from 'react'
import { RefreshCw, Bot, BookOpen } from 'lucide-react'
import { useHistory } from '../hooks/useHistory'
import HistoryItem from './HistoryItem'
import LoadingSpinner from './LoadingSpinner'

const HistoryTab = () => {
  const [timeRange, setTimeRange] = useState('24h')
  const { history, loading, loadHistory, summarizeHistory, summary, summarizing } = useHistory()

  useEffect(() => {
    loadHistory(timeRange)
  }, [timeRange])

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Today' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
  ]

  return (
    <div className="flex flex-col h-full p-5">
      {/* Controls */}
      <div className="flex gap-3 mb-5">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:outline-none transition-colors"
          aria-label="Time range selector"
        >
          {timeRangeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <button
          onClick={() => loadHistory(timeRange)}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <div className="flex items-center gap-2">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Load
          </div>
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto mb-5">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner text="Loading history..." />
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <BookOpen size={48} className="mb-3 opacity-50" />
            <p className="text-center">
              No history found for the selected time range.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, index) => (
              <HistoryItem key={`${item.url}-${index}`} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="border-t border-gray-200 pt-5">
        <button
          onClick={() => summarizeHistory(history)}
          disabled={summarizing || history.length === 0}
          className="w-full mb-3 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <div className="flex items-center justify-center gap-2">
            <Bot size={14} />
            {summarizing ? 'Generating...' : 'AI Summary'}
          </div>
        </button>
        
        <div className="bg-gray-50 rounded-lg p-4 min-h-[60px] flex items-center justify-center text-sm text-gray-600 leading-relaxed">
          {summarizing ? (
            <LoadingSpinner text="Generating AI summary..." />
          ) : summary ? (
            <p>{summary}</p>
          ) : (
            <p className="text-center text-gray-400">
              Click "AI Summary" to get an intelligent summary of your browsing history.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default HistoryTab
