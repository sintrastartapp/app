import { site } from "@/config/constants";
import Image from "next/image";

export function LogoTagline() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative h-[59px] w-[145px]">
        <Image src="/logo-sintra.png" alt={site.name} fill />
      </div>
      <p className="text-center text-xs font-medium">{site.tagline}</p>
    </div>
  );
}
