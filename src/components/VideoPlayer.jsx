import React, { useRef, useState, useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

export default function VideoPlayer({ song }) {
  const containerRef = useRef(null)
  const iframeRef = useRef(null)
  const [fullscreen, setFullscreen] = useState(false)

  const toggleFullscreen = async () => {
    try {
      if (!fullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen()
        } else if (containerRef.current.webkitRequestFullscreen) {
          await containerRef.current.webkitRequestFullscreen()
        }
        setFullscreen(true)
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen()
        }
        setFullscreen(false)
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err)
    }
  }

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null
    
    let videoId
    
    // youtu.be format
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0]
    }
    // youtube.com/watch format
    else if (url.includes('youtube.com/watch')) {
      videoId = new URLSearchParams(url.split('?')[1]).get('v')
    }
    // Already an embed URL
    else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0]
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0` : null
  }

  const title = song.title || 'Unknown'
  const artist = song.artist || 'Unknown'
  const album = song.album || 'Unknown Album'
  const url = song.url || ''
  const embedUrl = getYouTubeEmbedUrl(url)

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col bg-black rounded-lg overflow-hidden"
    >
      <div className="relative bg-black flex-1 flex items-center justify-center overflow-hidden">
        {embedUrl ? (
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="text-9xl">♪</div>
            <p className="text-gray-400 text-xl">No video available</p>
            <p className="text-gray-500 text-sm">Video URL: {url || 'Not provided'}</p>
          </div>
        )}
      </div>

      {/* Song Info */}
      {embedUrl && (
        <div className="bg-gray-900 p-4 border-t border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-bold line-clamp-1">{title}</h2>
              <p className="text-gray-400 text-sm">{artist}</p>
              <p className="text-gray-500 text-xs mt-1">{album}</p>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 hover:bg-gray-800 rounded transition-colors text-red-600 hover:text-red-500"
              title="Open in YouTube"
            >
              <OpenInNewIcon className="text-2xl" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}