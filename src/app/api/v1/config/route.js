import { NextResponse } from "next/server";
import { getConfig, saveConfig } from "@/lib/admin/config-actions";

export async function GET() {
  const config = await getConfig();
  if (!config) {
    return NextResponse.json({ error: "Config not found" }, { status: 404 });
  }

  return NextResponse.json(config);
}

export async function POST(req) {
  const config = await req.json();

  await saveConfig({
    partyName: config.partyName,
    partySlogan: config.partySlogan,
    footerMessage: config.footerMessage,
    useLocal: config.useLocal,
  });

  return NextResponse.json({ message: "ok" });
}
