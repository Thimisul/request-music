"use client";

import { useState } from "react";

export function useSearch(showNotification, fetchQueue) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [addingTrack, setAddingTrack] = useState(null);

  const handleSearch = async () => {
    try {
      const searchResult = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/spotify/search?` +
          new URLSearchParams({ q: searchQuery }).toString(),
      ).then((r) => r.json());

      if (searchResult.error) {
        showNotification(
          searchResult.message || "Erro ao buscar músicas",
          "error",
        );
        return;
      }

      setSearchResults(searchResult);
    } catch (error) {
      showNotification("Erro de conexão ao buscar músicas", "error");
    }
  };

  const addToPlaylist = async (track) => {
    setAddingTrack(track);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/spotify/queue`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(track),
        },
      );

      const result = await response.json();

      if (!response.ok || result.error) {
        showNotification(
          result.message || "Erro ao adicionar música à playlist",
          "error",
        );
        return;
      }

      showNotification("Música adicionada à playlist! 🎵", "success");
    } catch (error) {
      showNotification("Erro de conexão ao adicionar música", "error");
    } finally {
      setTimeout(() => fetchQueue(), 200);
      setTimeout(() => setAddingTrack(null), 500);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    handleSearch,
    addToPlaylist,
    addingTrack,
  };
}
