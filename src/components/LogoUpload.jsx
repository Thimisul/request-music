"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  uploadLogo,
  removeLogo,
  getCurrentLogo,
} from "@/lib/admin/logo-actions";

export default function LogoManager() {
  const [currentLogo, setCurrentLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    (async () => {
      const logo = await getCurrentLogo();
      setCurrentLogo(logo.exists ? logo : null);
    })();
  }, []);

  const resetForm = useCallback(() => {
    setPreview(null);
    setSelectedFile(null);
    setError("");
    formRef.current?.reset();
  }, []);

  const handleFileSelect = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Selecione um arquivo de imagem válido.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("O arquivo deve ter até 5MB.");
      return;
    }
    setSelectedFile(file);
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      handleFileSelect(e.target.files[0]);
    },
    [handleFileSelect],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      handleFileSelect(e.dataTransfer.files[0]);
    },
    [handleFileSelect],
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("logo", selectedFile);
      const result = await uploadLogo(formData);
      if (result.success) {
        setCurrentLogo({
          exists: true,
          url: result.url,
          filename: result.filename,
        });
        resetForm();
      } else {
        setError(result.error || "Erro ao processar upload");
      }
    } catch {
      setError("Erro ao processar upload");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm("Tem certeza que deseja remover a logo atual?")) return;
    setLoading(true);
    setError("");
    try {
      const result = await removeLogo();
      if (result.success) setCurrentLogo(null);
      else setError(result.error || "Erro ao remover logo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">🖼️</span>
        </div>
        <h3 className="text-xl font-semibold text-green-100">Logo do Site</h3>
      </div>

      {currentLogo && (
        <div className="mb-6 bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-green-200 font-medium">Logo Atual</h4>
            <button
              onClick={handleRemove}
              disabled={loading}
              aria-label="Remover logo atual"
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-colors text-sm disabled:opacity-50"
            >
              {loading ? "Removendo..." : "Remover"}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
              <Image
                src={currentLogo.url}
                alt="Logo atual"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-green-300 text-sm truncate">
                {currentLogo.filename}
              </p>
            </div>
          </div>
        </div>
      )}

      <form ref={formRef} id="logo-form" onSubmit={handleUpload}>
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragOver
              ? "border-purple-400 bg-purple-400/10"
              : "border-white/20 hover:border-white/40"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={loading}
            aria-label="Selecionar arquivo de logo"
          />

          {!preview ? (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div className="text-green-200">
                <p className="text-lg font-medium">
                  {currentLogo
                    ? "Substituir logo atual"
                    : "Adicionar logo do site"}
                </p>
                <p className="text-sm text-green-300">
                  Arraste uma imagem aqui ou clique para selecionar
                </p>
              </div>
              <p className="text-xs text-green-400">
                PNG, JPG, GIF ou WebP até 5MB
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-xl overflow-hidden bg-white/10">
                <Image
                  src={preview}
                  alt="Preview da nova logo"
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-xl"
                />
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="text-red-400 text-xs mt-2 text-center">{error}</div>
        )}

        {preview && (
          <div className="flex gap-3 justify-center mt-4">
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-colors text-sm disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-medium transition-all text-sm ${
                loading
                  ? "bg-gray-500/20 text-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/25"
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  {currentLogo ? "Substituindo..." : "Enviando..."}
                </div>
              ) : currentLogo ? (
                "Substituir Logo"
              ) : (
                "Salvar Logo"
              )}
            </button>
          </div>
        )}
      </form>

      <div className="mt-4 text-xs text-green-400 space-y-1">
        <p>• A logo será salva como arquivo único no site</p>
        <p>• Substituir a logo atual removerá a anterior automaticamente</p>
      </div>
    </>
  );
}
