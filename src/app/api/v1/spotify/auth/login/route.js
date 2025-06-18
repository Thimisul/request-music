import { NextRequest, NextResponse } from "next/server";

const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/spotify/auth/callback`;

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "user-modify-playback-state user-read-playback-state",
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return NextResponse.redirect(url);
}
