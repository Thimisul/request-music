"use client";
import { useState, useEffect } from "react";
const TextHeader = () => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    async function fetchConfig() {
      const res = await fetch("/api/v1/config");
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      } else {
        console.error("Failed to fetch config");
      }
    }
    fetchConfig();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-yellow-300 drop-shadow-sm">
        {config.partyName}
      </h1>
      <p className="text-lg text-green-100 mt-2">{config.partySlogan}</p>
    </div>
  );
};

export default TextHeader;
