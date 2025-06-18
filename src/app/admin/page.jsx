import { getStoredToken } from "@/lib/spotify-t";
import Link from "next/link";
import LogoUpload from "@/components/LogoUpload";
import Config from "@/components/Config";
import AdminAccessGuard from "@/components/AdminAccessGuard";

export default async function AdminPage() {
  const token = await getStoredToken();

  return (
    <AdminAccessGuard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="flex flex-col gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 h-fit shadow-xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-green-100">
              🎧 Admin Spotify
            </h1>

            {!token ? (
              <div className="flex flex-col space-y-4 items-center">
                <p className="text-gray-700 text-center">
                  Conecte sua conta do Spotify para acessar as funcionalidades.
                </p>
                <Link
                  href="/api/v1/spotify/auth/login"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-md"
                >
                  Conectar com Spotify
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-6">
                <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">
                  ✅ Token conectado com sucesso!
                </div>

                <div className="flex flex-col space-y-3">
                  <Link
                    href="/api/v1/spotify/auth/login"
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-md text-center"
                  >
                    Reconectar
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 h-fit shadow-xl">
            <Config />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 h-fit shadow-xl">
          <LogoUpload />
        </div>
      </div>
    </AdminAccessGuard>
  );
}
