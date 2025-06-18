import fs from "fs/promises";
import path from "path";

const STORAGE_PATH =
  process.env.NODE_ENV === "production"
    ? "/app/storage"
    : path.join(process.cwd(), "storage");

const configFile = path.join(STORAGE_PATH, "config.json");

export async function saveConfig(config) {
  console.log("Saving config:", config);
  await fs.writeFile(configFile, JSON.stringify(config, null, 2), "utf-8");
  return true;
}

export async function getConfig() {
  try {
    const file = await fs.readFile(configFile, "utf-8");
    const config = JSON.parse(file);
    return config;
  } catch (error) {
    return null;
  }
}
