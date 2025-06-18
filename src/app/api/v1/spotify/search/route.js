import { NextRequest, NextResponse } from "next/server";
import { getValidToken } from "@/lib/spotify-t";
import { isLocalConnect } from "@/lib/utilSv";

export async function GET(req) {
  const local = await isLocalConnect();
  if (!local) {
    return NextResponse.json(
      {
        message:
          "Por favor se conecte a mesma rede que está tocando as músicas",
      },
      { status: 401 },
    );
  }

  const token = await getValidToken();
  const query = req.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data.tracks.items);
}
