import { NextRequest, NextResponse } from "next/server";
import { getValidToken } from "@/lib/spotify-t";

export async function GET() {
  const token = await getValidToken();
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status === 204) {
    return NextResponse.json(
      { message: "Nothing is playing" },
      { status: 204 },
    );
  }

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data.item);
}
