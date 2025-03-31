"use client";

import { useTawkContext } from "@/app/(protected)/contexts/tawk-context";
import { env } from "@/config/env-config";
import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API: {
      hideWidget: () => void;
      showWidget: () => void;
    };
  }
}

export function TawkSnippet() {
  const { tawkVisible } = useTawkContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!window.Tawk_API) {
        return;
      }

      if (tawkVisible) {
        window.Tawk_API.showWidget();
      } else {
        window.Tawk_API.hideWidget();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [tawkVisible]);

  if (!env.NEXT_PUBLIC_TAWK_ACCOUNT_ID && !env.NEXT_PUBLIC_TAWK_WIDGET_ID) {
    return null;
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/${env.NEXT_PUBLIC_TAWK_ACCOUNT_ID}/${env.NEXT_PUBLIC_TAWK_WIDGET_ID}';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
        `,
      }}
    />
  );
}
