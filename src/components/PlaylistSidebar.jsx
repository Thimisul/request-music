"use client";

import { Music } from "lucide-react";
import { msToMinSec } from "@/lib/util";

export function PlaylistSidebar({ playlist }) {
  return (
    <div className="order-2 md:order-2 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl flex flex-col max-h-[600px]">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 flex-shrink-0">
        <div className="p-2 bg-yellow-600 rounded-full">
          <Music className="w-6 h-6 text-white" />
        </div>
        Próximas Músicas
        {playlist?.length > 0 && (
          <span className="text-sm bg-yellow-600 text-white px-2 py-1 rounded-full ml-auto">
            {playlist.length}
          </span>
        )}
      </h3>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-4 pr-2">
          {playlist?.map((track, index) => (
            <div
              key={`${track?.id}-${index}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
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

          {playlist?.length === 0 && (
            <div className="text-center py-8 text-yellow-400">
              <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Sua playlist está vazia</p>
              <p className="text-sm">Busque e adicione músicas acima</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
