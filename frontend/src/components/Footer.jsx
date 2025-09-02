import React from 'react'
import { Github, ExternalLink } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between text-xs text-gray-600">
        {/* Tech Stack Info with Logos */}
        <div className="flex items-center gap-3">
          <span className="text-gray-400">Build by</span>
          <a
            href="https://akillabs.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-600 hover:text-[#a6ffdd] transition-colors"
            title="Visit AkilLabs Portfolio"
          >
            <span>Akillabs</span>
          </a>
        </div>
        
        {/* Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/AkilLabs/HistAIry"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
            title="View on GitHub"
          >
            <Github size={12} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
