"use client";
import { useState, useEffect } from "react";

export default function Config() {
  const [config, setConfig] = useState({});

  useEffect(() => {
    // Load initial config from localStorage or API
    async function fetchConfig() {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/config",
      );
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      } else {
        console.error("Failed to fetch config");
      }
    }
    fetchConfig();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/config",
      {
        method: "POST",
        body: JSON.stringify(config),
      },
    );
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Configurações do Sistema</h2>
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          name="useLocal"
          checked={!!config.useLocal}
          onChange={handleChange}
        />
        <label htmlFor="useLocal" className="text-sm font-medium">
          Utilizar configuração local
        </label>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nome do Sistema
          </label>
          <input
            type="text"
            name="partyName"
            defaultValue={config.partyName}
            onChange={handleChange}
            className="w-full p-2 bg-white/20 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slogan</label>
          <input
            name="partySlogan"
            defaultValue={config.partySlogan}
            onChange={handleChange}
            className="w-full p-2 bg-white/20 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
        >
          Salvar Configurações
        </button>
      </div>
    </>
  );
}
