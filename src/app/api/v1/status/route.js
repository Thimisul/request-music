import { isLocalConnect } from "@/lib/utilSv";
import { getHaveToken } from "@/lib/spotify-t";
import { NextResponse } from "next/server";

export async function GET() {
  const status = {
    updated_at: new Date(),
    local: {
      connected: await isLocalConnect(),
    },
    spotify: {
      connected: await getHaveToken(),
    },
  };
  return NextResponse.json(status, { status: 200 });
}
