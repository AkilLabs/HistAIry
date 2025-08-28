import React from 'react'

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center gap-2 text-gray-500">
      <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
      <span className="text-sm">{text}</span>
    </div>
  )
}

export default LoadingSpinner
