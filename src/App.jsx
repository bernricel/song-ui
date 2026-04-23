import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [songs, setSongs] = useState([])
  const [selectedSong, setSelectedSong] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // API Base URL
  const API_BASE = 'https://song-api-fohg.onrender.com/musngi'

  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = async (query = '') => {
    setLoading(true)
    setError(null)
    try {
      const endpoint = query 
        ? `${API_BASE}/songs?search=${query}`
        : `${API_BASE}/songs`
      
      console.log('Fetching from:', endpoint)
      
      const response = await fetch(endpoint)
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Response data:', data)
      
      // Handle different response formats
      let songsList = []
      
      if (Array.isArray(data)) {
        songsList = data
      } else if (data.content) {
        songsList = data.content
      } else if (data.songs) {
        songsList = data.songs
      } else if (data.data) {
        songsList = data.data
      }
      
      console.log('Songs list:', songsList)
      setSongs(songsList)
      
      // Select first song by default
      if (songsList.length > 0 && !selectedSong) {
        setSelectedSong(songsList[0])
      }
    } catch (err) {
      console.error('Full error:', err)
      setError(`Failed to load songs: ${err.message}`)
    }
    setLoading(false)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term.trim()) {
      fetchSongs(term)
    } else {
      fetchSongs()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-dark overflow-hidden">
      <Header 
        onSearch={handleSearch}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        <MainContent 
          songs={songs}
          selectedSong={selectedSong}
          onSongSelect={setSelectedSong}
          loading={loading}
          error={error}
          onRetry={() => fetchSongs(searchTerm)}
        />
      </div>
    </div>
  )
}

export default App