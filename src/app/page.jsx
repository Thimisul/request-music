"use client";

import React, { useState, useEffect } from "react";
import { isLocalConnect } from "@/lib/utilSv";

// Components

import { Player } from "@/components/Player";
import { PlaylistSidebar } from "@/components/PlaylistSidebar";
import { SearchSection } from "@/components/SearchSection";
import { Notification } from "@/components/Notification";

// Hooks
import { useNotification } from "@/hooks/useNotification";
import { useSpotifyData } from "@/hooks/useSpotifyData";
import { useSearch } from "@/hooks/useSearch";

export default function CasaVerdeMusicApp() {
  const [isLocal, setIsLocal] = useState(false);

  // Custom hooks
  const { notification, showNotification, hideNotification } =
    useNotification();
  const { currentTrack, playlist, currentTrackKey, fetchQueue } =
    useSpotifyData(showNotification);
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    handleSearch,
    addToPlaylist,
    addingTrack,
  } = useSearch(showNotification, fetchQueue);

  useEffect(() => {
    async function fetchIsLocal() {
      setIsLocal(await isLocalConnect());
    }
    fetchIsLocal();
  }, []);

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <>
      <Notification notification={notification} onClose={hideNotification} />
      {currentTrack ? (
        <div className="grid grid-cols-1 gap-8">
          <Player
            currentTrack={currentTrack}
            currentTrackKey={currentTrackKey}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PlaylistSidebar playlist={playlist} />

            <div className="order-1 md:order-1 space-y-8">
              {isLocal && (
                <SearchSection
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  searchResults={searchResults}
                  handleSearch={handleSearch}
                  addToPlaylist={addToPlaylist}
                  addingTrack={addingTrack}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
          Não estamos tocando nada no momento!
        </div>
      )}
    </>
  );
}
