import { useEffect, useState } from "react";

const AdminCode = () => {
  const [code, setCode] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedCode = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin_code="));
    if (savedCode) {
      setCode(decodeURIComponent(savedCode.split("=")[1]));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    document.cookie = `admin_code=${encodeURIComponent(code)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    setSaved(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Código de Admin</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Digite o código de admin"
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-md"
        >
          Salvar Código
        </button>
      </form>
      {saved && (
        <p className="mt-4 text-green-600">Código salvo com sucesso!</p>
      )}
    </div>
  );
};
export default AdminCode;
