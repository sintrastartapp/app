import { site } from "@/config/constants";
import Image from "next/image";

export function SidebarHeader() {
  return (
    <div className="my-4 flex h-header flex-col items-center justify-center gap-1 overflow-hidden">
      <div className="relative h-[40px] w-[98px]">
        <Image src="/logo-sintra.png" alt={site.name} fill />
      </div>
      <p className="text-center text-xs">{site.tagline}</p>
    </div>
  );
}
