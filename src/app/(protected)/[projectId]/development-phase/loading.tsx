import { Loader2Icon } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Loader2Icon className="size-12 animate-spin" />
    </div>
  );
}
