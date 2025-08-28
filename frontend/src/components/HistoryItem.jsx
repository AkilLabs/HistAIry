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
    <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 hover:border-primary-300">
      <h4 className="text-sm font-semibold text-gray-700 mb-2 line-clamp-2">
        {item.title || 'No title'}
      </h4>
      
      <button
        onClick={handleClick}
        className="flex items-center gap-2 text-xs text-primary-600 hover:text-primary-700 transition-colors group w-full text-left"
      >
        <span className="truncate flex-1">{item.url}</span>
        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
      </button>
    </div>
  )
}

export default HistoryItem
