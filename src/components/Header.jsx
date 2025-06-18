import Image from "next/image";
import { getCurrentLogo } from "@/lib/admin/logo-actions";
import TextHeader from "./Header/TextHeader";

export default async function Header() {
  const logo = await getCurrentLogo();

  return (
    <header className="mb-12 text-white">
      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center gap-6">
        {/* Logo */}
        {logo.exists && (
          <div className="flex-shrink-0">
            <Image
              priority
              src={logo.url}
              alt="Logo da Casa Verde"
              width={160}
              height={160}
              className="w-32 sm:w-40 h-auto object-contain drop-shadow-lg"
            />
          </div>
        )}
        <TextHeader />
      </div>
      <div className="mt-6 relative w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent">
        <div className="absolute top-0 left-0 w-full h-full blur-sm opacity-30 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
      </div>
    </header>
  );
}
