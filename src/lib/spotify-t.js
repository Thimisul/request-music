"use server";

import fs from "fs/promises";
import path from "path";

const tokenFile = path.join(process.cwd(), "data", "spotify-token.json");

export async function saveToken(token) {
  await fs.writeFile(tokenFile, JSON.stringify(token, null, 2), "utf-8");
}

export async function getHaveToken() {
  try {
    const file = await fs.readFile(tokenFile, "utf-8");
    const token = JSON.parse(file);
    return token.access_token ? true : false;
  } catch (error) {
    return null;
  }
}

export async function getStoredToken() {
  try {
    const file = await fs.readFile(tokenFile, "utf-8");
    const token = JSON.parse(file);
    return token;
  } catch (error) {
    return null;
  }
}

async function refreshAccessToken(refresh_token) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to refresh Spotify token");
  }

  const data = await res.json();

  const newToken = {
    access_token: data.access_token,
    refresh_token: refresh_token,
    expires_at: Date.now() + data.expires_in * 1000 - 60000,
  };

  await saveToken(newToken);

  return newToken;
}

export async function getValidToken() {
  const token = await getStoredToken();

  if (!token) {
    throw new Error("Spotify token not found");
  }

  const isExpired = Date.now() >= token.expires_at;
  if (isExpired) {
    console.log("Refreshing Spotify token...");
    const refreshed = await refreshAccessToken(token.refresh_token);
    return refreshed.access_token;
  }
  return token.access_token;
}
