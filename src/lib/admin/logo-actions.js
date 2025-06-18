// lib/logo-actions.js
"use server";

import fs from "fs";
import path from "path";

const LOGO_FILENAME = "logo";
const STORAGE_PATH =
  process.env.NODE_ENV === "production"
    ? "/app/storage"
    : path.join(process.cwd(), "storage");

export async function getCurrentLogo() {
  try {
    const logoDir = STORAGE_PATH;
    const files = fs.readdirSync(logoDir);

    const logoFile = files.find(
      (file) =>
        file.startsWith(LOGO_FILENAME + ".") &&
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file),
    );

    if (logoFile) {
      return {
        exists: true,
        url: `/${logoFile}`,
        filename: logoFile,
      };
    }

    return { exists: false };
  } catch (error) {
    console.error("Erro ao buscar logo:", error);
    return { exists: false };
  }
}

async function removeCurrentLogo() {
  try {
    const logoDir = STORAGE_PATH;
    const files = fs.readdirSync(logoDir);

    // Encontrar e remover logo atual
    const logoFiles = files.filter(
      (file) =>
        file.startsWith(LOGO_FILENAME + ".") &&
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file),
    );

    logoFiles.forEach((file) => {
      const filePath = path.join(logoDir, file);
      fs.unlinkSync(filePath);
    });

    return true;
  } catch (error) {
    console.error("Erro ao remover logo:", error);
    return false;
  }
}

export async function uploadLogo(formData) {
  try {
    const file = formData.get("logo");

    if (
      !formData ||
      typeof formData !== "object" ||
      typeof formData.get !== "function"
    ) {
      return {
        success: false,
        error: "Nenhum arquivo válido enviado",
      };
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Tipo de arquivo não permitido. Use JPG, PNG, GIF ou WebP",
      };
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        success: false,
        error: "Arquivo muito grande. Máximo 5MB",
      };
    }

    await removeCurrentLogo();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extension = ".png";
    if (file.type === "image/jpeg" || file.type === "image/jpg")
      extension = ".jpg";
    else if (file.type === "image/png") extension = ".png";
    else if (file.type === "image/gif") extension = ".gif";
    else if (file.type === "image/webp") extension = ".webp";

    const filename = LOGO_FILENAME + extension;
    const filepath = path.join(STORAGE_PATH, filename);

    fs.writeFileSync(filepath, buffer);

    return {
      success: true,
      message: "Logo atualizada com sucesso",
      url: `/${filename}`,
      filename: filename,
      size: file.size,
      type: file.type,
    };
  } catch (error) {
    console.error("Erro no upload:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

export async function removeLogo() {
  try {
    const removed = await removeCurrentLogo();

    if (removed) {
      return {
        success: true,
        message: "Logo removida com sucesso",
      };
    } else {
      return {
        success: false,
        error: "Erro ao remover logo",
      };
    }
  } catch (error) {
    console.error("Erro ao remover logo:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}
