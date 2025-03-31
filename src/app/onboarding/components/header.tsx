import { site } from "@/config/constants";
import Image from "next/image";

export function OnboardingHeader() {
  return (
    <header className="flex h-24 items-center px-8">
      <h2 className="font-heading text-4xl font-extrabold">
        <div className="relative h-[40px] w-[98px]">
          <Image src="/logo-sintra.png" alt={site.name} fill />
        </div>
      </h2>
    </header>
  );
}
