"use client";

export function Player({ currentTrack, currentTrackKey }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <img
            key={currentTrackKey}
            src={currentTrack?.album?.images[0]?.url}
            alt={currentTrack?.album?.name}
            className="w-40 h-40 sm:w-52 sm:h-52  rounded-2xl shadow-2xl object-cover group-hover:scale-105 transition-all duration-500 animate-slideInRotate"
          />
          <div className="absolute inset-0 bg-black/20 rounded-2xl group-hover:bg-black/10 transition-all duration-300"></div>
          <div className="absolute inset-0 rounded-2xl animate-pulse-ring"></div>
        </div>

        <div className="flex-1 text-center animate-fadeInUp">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            {currentTrack?.name}
          </h2>
          <p className="text-lg sm:text-xl text-yellow-100 mb-1">
            {currentTrack?.album?.artists?.[0]?.name}
          </p>
          <p className="text-yellow-300 mb-6">{currentTrack?.album?.name}</p>
        </div>
      </div>
    </div>
  );
}
