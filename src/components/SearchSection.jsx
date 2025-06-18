"use client";

import { Search, CheckCircle } from "lucide-react";
import { msToMinSec } from "@/lib/util";

export function SearchSection({
  searchQuery,
  setSearchQuery,
  searchResults,
  handleSearch,
  addToPlaylist,
  addingTrack,
}) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <div className="p-2 bg-yellow-600 rounded-full">
          <Search className="w-6 h-6 text-white" />
        </div>
        Buscar Músicas
      </h3>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Digite o nome da música, artista ou álbum..."
          className="w-full p-4 bg-black/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:bg-black/30 focus:ring-2 focus:ring-yellow-400/50 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          onBlur={() => searchQuery.trim() && handleSearch()}
        />
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-300 border-b border-white/20 pb-2 flex items-center justify-between">
            Resultados da Busca
            <span className="text-sm bg-yellow-600 text-white px-2 py-1 rounded-full ml-auto">
              {searchResults.length}
            </span>
          </h4>
          <div className="max-h-90 overflow-y-auto custom-scrollbar pr-2">
            <div className="space-y-3">
              {searchResults.map((track, index) => (
                <div
                  key={track.uri}
                  onClick={() => addToPlaylist(track.uri)}
                  className={`flex items-center gap-4 p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-all duration-300 group cursor-pointer animate-fadeInUp ${
                    addingTrack === track.uri
                      ? "animate-pulse bg-green-600/30 scale-105"
                      : ""
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={track?.album?.images[0]?.url}
                      alt={track?.album?.artists[0]?.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{track?.name}</h4>
                    <p className="text-sm text-yellow-400 truncate">
                      {track?.album?.artists[0]?.name}
                    </p>
                  </div>
                  <span className="text-xs text-yellow-600 flex-shrink-0">
                    {msToMinSec(track.duration_ms)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
