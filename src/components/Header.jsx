import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function Header({ onSearch, onToggleSidebar }) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="bg-dark-secondary border-b border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-xl">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onToggleSidebar}
          className="text-gray-300 hover:text-white hover:bg-gray-800 rounded-full p-2 transition-all"
          title="Toggle sidebar"
        >
          <MenuIcon className="text-2xl" />
        </button>
        <div className="text-2xl font-bold tracking-wider flex items-center gap-2">
          <span className="text-red-600 text-3xl">▶</span>
          <span>SongTube</span>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-8">
        <div className={`relative transition-all ${searchFocused ? 'ring-2 ring-red-600' : ''}`}>
          <input
            type="text"
            placeholder="Search songs, artists, albums..."
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full px-4 py-2.5 bg-gray-800 text-white rounded-full focus:outline-none focus:bg-gray-700 transition-all placeholder-gray-500 pr-10 border border-gray-700 hover:border-gray-600 focus:border-red-600"
          />
          <SearchIcon className="absolute right-3.5 top-3 text-gray-400 text-xl pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="text-gray-300 hover:text-white hover:bg-gray-800 rounded-full p-2 transition-all"
          title="Account"
        >
          <AccountCircleIcon className="text-3xl" />
        </button>
      </div>
    </header>
  )
}