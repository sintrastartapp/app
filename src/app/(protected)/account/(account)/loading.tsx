import { Loader2Icon } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center">
      <Loader2Icon className="size-12 animate-spin" />
    </div>
  );
}
