"use client";

import { useState } from "react";

export function useSpotifyData(showNotification) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  const fetchQueue = async () => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/spotify/queue`,
      ).then((r) => r.json());

      if (result.error) {
        setCurrentTrack(null);
        setPlaylist(null);
        showNotification(
          result.message || "Erro ao carregar playlist",
          "error",
        );
        return;
      }

      setCurrentTrack(result.currently_playing);
      setPlaylist(result.queue);
    } catch (error) {
      showNotification("Erro de conexão ao carregar playlist", "error");
    }
  };

  return {
    currentTrack,
    playlist,
    fetchQueue,
  };
}
