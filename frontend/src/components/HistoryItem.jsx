import React from 'react'
import { ExternalLink } from 'lucide-react'

const HistoryItem = ({ item }) => {
  const handleClick = (e) => {
    e.preventDefault()
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: item.url })
    } else {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all duration-200 group">
      <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-900">
        {item.title || 'No title'}
      </h4>
      
      <button
        onClick={handleClick}
        className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 transition-colors group/link w-full text-left"
      >
        <span className="truncate flex-1 font-mono">{item.url}</span>
        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-blue-500" />
      </button>
    </div>
  )
}

export default HistoryItem
