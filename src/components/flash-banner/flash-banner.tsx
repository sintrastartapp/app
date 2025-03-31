"use client";

import { InfoIcon } from "lucide-react";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { removeFlash } from "./actions";

export function FlashBanner({ message }: { message: string }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeFlash();
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="px-4">
      <Alert variant="info" className="pl-6 font-heading">
        <InfoIcon className="size-6" />
        <AlertTitle className="text-lg font-bold">Hey!</AlertTitle>
        <AlertDescription className="text-base font-medium">
          {message}
        </AlertDescription>
      </Alert>
    </div>
  );
}
