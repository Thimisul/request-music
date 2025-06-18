import fs from "fs/promises";
import path from "path";

const CONFIG_DIR =
  process.env.NODE_ENV === "production"
    ? "/tmp"
    : path.join(process.cwd(), "public");

const configFile = path.join(CONFIG_DIR, "data", "config.json");

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
