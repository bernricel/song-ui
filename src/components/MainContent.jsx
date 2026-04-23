import React, { useState } from "react";
import SongCard from "./SongCard";
import VideoPlayer from "./VideoPlayer";
import ErrorIcon from "@mui/icons-material/Error";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export default function MainContent({
  songs,
  selectedSong,
  onSongSelect,
  loading,
  error,
  onRetry,
}) {
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (songId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(songId)) {
      newFavorites.delete(songId);
    } else {
      newFavorites.add(songId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col lg:flex-row bg-dark">
      {/* Video Player Section */}
      {selectedSong ? (
        <div className="lg:w-2/3 bg-black p-4 border-b lg:border-b-0 lg:border-r border-gray-700 flex flex-col justify-center items-center min-h-96 lg:min-h-auto">
          <VideoPlayer song={selectedSong} />
        </div>
      ) : (
        <div className="lg:w-2/3 bg-black border-r border-gray-700 flex flex-col items-center justify-center">
          <MusicNoteIcon className="text-9xl text-gray-700 mb-4 opacity-40" />
          <p className="text-gray-400 text-xl font-semibold">
            Select a song to play
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Click any song from the list below
          </p>
        </div>
      )}

      {/* Songs Grid/List Section */}
      <div
        className={`${selectedSong ? "lg:w-1/3" : "w-full"} overflow-y-auto bg-dark flex flex-col`}
      >
        <div className="z-10 h-20 px-4 flex items-center gap-2 sticky top-0 bg-dark pt-2">
          <MusicNoteIcon className="text-red-600 text-2xl" />
          <h2 className="text-2xl font-bold">
            {songs.length > 0 ? `Songs (${songs.length})` : "Songs"}
          </h2>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6 flex items-start gap-4">
              <ErrorIcon className="text-red-600 mt-1 flex-shrink-0 text-2xl" />
              <div className="flex-1">
                <p className="text-red-300 font-semibold">
                  Error Loading Songs
                </p>
                <p className="text-red-200 text-sm mt-1">{error}</p>
                <button
                  onClick={onRetry}
                  className="mt-3 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded font-semibold transition-all"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-800 h-24 rounded-lg"
                />
              ))}
            </div>
          ) : songs.length === 0 ? (
            <div className="text-center py-16">
              <MusicNoteIcon className="text-7xl text-gray-700 mx-auto mb-4 opacity-40" />
              <p className="text-gray-400 text-lg font-semibold">
                No songs found
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try searching for something different
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 pb-32">
              {songs.map((song) => (
                <SongCard
                  key={song.id || song.videoId || song.title}
                  song={song}
                  isSelected={selectedSong?.id === song.id}
                  isLiked={favorites.has(song.id)}
                  onSelect={onSongSelect}
                  onLike={() => toggleFavorite(song.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
