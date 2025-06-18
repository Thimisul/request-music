import { NextRequest, NextResponse } from "next/server";
import { getValidToken } from "@/lib/spotify-t";
import { isLocalConnect } from "@/lib/utilSv";

export async function GET() {
  const token = await getValidToken();
  const res = await fetch("https://api.spotify.com/v1/me/player/queue", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req) {
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
  const uri = await req.text();
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/queue?uri=${uri.replace(/"/g, "")}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json({ error }, { status: res.status });
  }

  return NextResponse.json({ message: "ok" });
}
