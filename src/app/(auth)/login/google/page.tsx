"use client";

import { Loader2Icon } from "lucide-react";
import { useEffect, useTransition } from "react";
import { loginWithGoogleAction } from "./actions";

export default function LoginWithGooglePage() {
  const [pending, startTransition] = useTransition();

  function redirectToGoogle() {
    startTransition(async () => {
      const url = await loginWithGoogleAction();

      window.location.href = url;
    });
  }

  useEffect(() => {
    redirectToGoogle();
  }, []);
  // return Response.redirect(url);

  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-2">
      {pending && <Loader2Icon className="size-4 animate-spin" />} Continuing
      with Google...
    </div>
  );
}
