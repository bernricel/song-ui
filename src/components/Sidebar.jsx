import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function Sidebar({ isOpen }) {
  const menuItems = [
    { icon: <HomeIcon />, label: "Home", active: true },
    { icon: <TrendingUpIcon />, label: "Trending" },
    { icon: <SubscriptionsIcon />, label: "Subscriptions" },
    { icon: <PlaylistPlayIcon />, label: "Playlists" },
    { icon: <FavoriteBorderIcon />, label: "Liked Songs" },
    { icon: <HistoryIcon />, label: "History" },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-22"
      } bg-dark-secondary border-r border-gray-700 transition-all duration-300 overflow-y-auto flex flex-col h-full`}
    >
      <nav className="p-4 space-y-2 flex-1">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-6 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
              item.active
                ? "bg-red-600 text-white shadow-lg shadow-red-600/50"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
            title={item.label}
          >
            <div className="text-2xl flex-shrink-0">{item.icon}</div>
            {isOpen && (
              <span className="truncate font-medium text-sm">{item.label}</span>
            )}
          </div>
        ))}
      </nav>

      {isOpen && (
        <div className="p-4 border-t border-gray-700 bg-gray-900/50">
          <p className="text-xs text-gray-400 text-center">SongTube</p>
          <p className="text-xs text-gray-600 text-center mt-2">v1.0.0</p>
        </div>
      )}
    </aside>
  );
}
