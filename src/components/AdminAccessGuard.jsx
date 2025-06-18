"use client";
import { useState } from "react";
import { validateAdminCode } from "@/lib/utilSv";

export default function AdminAccessGuard({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");

  async function handleAuth(formData) {
    const valid = await validateAdminCode(formData);
    if (valid) {
      setIsAuthorized(true);
      setError("");
    } else {
      setError("Código incorreto!");
    }
  }

  if (!isAuthorized) {
    return (
      <form
        action={handleAuth}
        className="max-w-sm mx-auto mt-10"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-4">Acesso Restrito</h2>
        <input
          type="password"
          name="accessCode"
          placeholder="Digite o código de acesso"
          className="w-full p-2 mb-4 bg-white/20 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors w-full"
        >
          Entrar
        </button>
      </form>
    );
  }

  return children;
}
