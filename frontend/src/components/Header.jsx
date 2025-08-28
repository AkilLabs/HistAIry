import React from 'react'
import { Clock } from 'lucide-react'

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-5 text-center shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-1">
        <Clock size={24} />
        <h1 className="text-lg font-semibold">History Assistant</h1>
      </div>
      <p className="text-sm opacity-90">Your intelligent browsing companion</p>
    </div>
  )
}

export default Header
