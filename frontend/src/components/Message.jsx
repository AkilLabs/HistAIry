import React from 'react'
import { ExternalLink } from 'lucide-react'

const Message = ({ message }) => {
  const formatMessageContent = (content) => {
    // Convert URLs to clickable links while avoiding duplication
    const urlPattern = /(https?:\/\/[^\s\)\]\}\,]+)/g
    
    return content.replace(urlPattern, (url) => {
      const cleanUrl = url.replace(/[.,;!?\)\]\}]+$/, '')
      const trailingPunct = url.substring(cleanUrl.length)
      
      return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 underline decoration-1 underline-offset-2">${cleanUrl}<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>${trailingPunct}`
    })
  }

  const handleLinkClick = (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault()
      const url = e.target.href
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.create({ url })
      } else {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    }
  }

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 text-sm ${
          message.isUser
            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
            : 'bg-gray-50 border border-gray-200 text-gray-700'
        }`}
      >
        {message.isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div
            className="whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: formatMessageContent(message.content)
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 py-0.5 rounded text-xs">$1</code>')
                .replace(/\n\s*•\s/g, '\n• ')
                .replace(/\n/g, '<br>')
            }}
            onClick={handleLinkClick}
          />
        )}
      </div>
    </div>
  )
}

export default Message
