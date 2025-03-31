import { LogoTagline } from "@/components/logo-tagline";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <LogoTagline />
      <h2 className="font-heading text-8xl font-bold">404</h2>
      <p>Could not find requested resource</p>
      <Button variant="link" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
