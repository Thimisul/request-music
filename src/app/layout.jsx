import "@/styles/globals.css";

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-green-950 text-white">
        <main>
          <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-800 to-green-950 text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <Header />
              <div className="mt-10">{children}</div>
              <Footer />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
