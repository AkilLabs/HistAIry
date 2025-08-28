import React from 'react'

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center gap-3 text-gray-600">
      <div className="w-5 h-5 border-2 border-gray-300 border-t-accent rounded-full animate-spin" />
      <span className="text-sm font-medium text-black">{text}</span>
    </div>
  )
}

export default LoadingSpinner
