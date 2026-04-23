import React from 'react'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert'

export default function SongCard({ song, isSelected, isLiked, onSelect, onLike }) {
  // API uses: id, title, artist, album, genre, url
  const title = song.title || 'Unknown Title'
  const artist = song.artist || 'Unknown Artist'
  const album = song.album || ''
  const genre = song.genre || ''

  // Generate a placeholder thumbnail based on genre or artist
  const getThumbnail = () => {
    const colors = {
      'OPM': '#FF6B6B',
      'Rock': '#4ECDC4',
      'Pop': '#FFE66D',
      'Hip-Hop': '#95E1D3',
      'Jazz': '#C7CEEA',
      'Classical': '#B5EAD7'
    }
    
    const bgColor = colors[genre] || '#95A5A6'
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='${bgColor.replace('#', '%23')}' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='48' fill='white' text-anchor='middle' dy='.3em'%3E♪%3C/text%3E%3Ctext x='50%25' y='70%25' font-size='14' fill='white' text-anchor='middle' font-family='Arial'%3E${genre}%3C/text%3E%3C/svg%3E`
  }

  const thumbnail = getThumbnail()

  return (
    <div
      onClick={() => onSelect(song)}
      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 group hover:shadow-2xl ${
        isSelected
          ? 'bg-red-600 shadow-lg shadow-red-600/60'
          : 'bg-gray-900 hover:bg-gray-800'
      }`}
    >
      <div className="relative mb-3 overflow-hidden rounded-lg aspect-square bg-gray-800">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <PlayCircleIcon className="text-6xl text-white drop-shadow-lg filter drop-shadow-2xl" />
        </div>
      </div>

      <h3 className="font-bold line-clamp-2 text-sm mb-1 group-hover:text-red-300 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-xs mb-1 line-clamp-1">{artist}</p>
      <p className="text-gray-500 text-xs mb-3">{album}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 font-semibold">{genre}</span>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onLike()
            }}
            className="text-gray-400 hover:text-red-600 transition-colors p-1 hover:bg-gray-800 rounded"
            title={isLiked ? 'Unlike' : 'Like'}
          >
            {isLiked ? (
              <FavoriteIcon className="text-red-600 text-lg" />
            ) : (
              <FavoriteBorderIcon className="text-lg" />
            )}
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded"
          >
            <MoreVertIcon className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  )
}