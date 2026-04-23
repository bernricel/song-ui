import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [allSongs, setAllSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_BASE = "https://song-api-fohg.onrender.com/musngi";

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = `${API_BASE}/songs`;

      console.log("Fetching from:", endpoint);

      const response = await fetch(endpoint);
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      let songsList = [];

      if (Array.isArray(data)) {
        songsList = data;
      } else if (data.content) {
        songsList = data.content;
      } else if (data.songs) {
        songsList = data.songs;
      } else if (data.data) {
        songsList = data.data;
      }

      console.log("Songs list:", songsList);

      setAllSongs(songsList);

      if (songsList.length > 0) {
        setSelectedSong((prev) => prev || songsList[0]);
      }
    } catch (err) {
      console.error("Full error:", err);
      setError(`Failed to load songs: ${err.message}`);
    }

    setLoading(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredSongs = allSongs.filter((song) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return true;

    return (
      song.title?.toLowerCase().includes(search) ||
      song.artist?.toLowerCase().includes(search) ||
      song.albumTitle?.toLowerCase().includes(search) ||
      song.genre?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="flex flex-col h-screen bg-dark overflow-hidden">
      <Header
        onSearch={handleSearch}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />

        <MainContent
          songs={filteredSongs}
          selectedSong={selectedSong}
          onSongSelect={setSelectedSong}
          loading={loading}
          error={error}
          onRetry={fetchSongs}
        />
      </div>
    </div>
  );
}

export default App;
