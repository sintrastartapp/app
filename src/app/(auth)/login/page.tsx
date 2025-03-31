import { LogoTagline } from "@/components/logo-tagline";
import { Button } from "@/components/ui/button";
import { site } from "@/config/constants";
import { Links } from "@/config/links";
import { getUser } from "@/lib/auth";
import getConfig from "next/config";
import Link from "next/link";
import { LoginWithGoogle } from "./components/login-with-google";

export default async function LoginPage() {
  const user = await getUser();
  const { version } = getConfig().publicRuntimeConfig;

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form className="flex w-full max-w-sm flex-col items-center justify-center gap-12">
        <LogoTagline />

        <ul className="w-full">
          {user ? (
            <li className="text-center">
              <Button asChild className="mx-auto">
                <Link href={Links.LogOut} prefetch={false}>
                  Logout
                </Link>
              </Button>
            </li>
          ) : (
            <>
              <li>
                <LoginWithGoogle />
              </li>
            </>
          )}
        </ul>
        <p className="flex flex-col gap-2 text-center text-xs text-slate-500">
          <span>
            By clicking the button above, you agree with{" "}
            <strong>{site.name}</strong>{" "}
          </span>

          <span>
            <Link
              href={Links.TermsOfUse}
              target="_blank"
              className="underline underline-offset-2"
            >
              Terms of Use
            </Link>{" "}
            and the{" "}
            <Link
              href={Links.PrivacyPolicy}
              target="_blank"
              className="underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </p>
      </form>

      <div className="fixed bottom-0 right-2 my-2 text-right text-[10px] text-muted-foreground">
        v{version}
      </div>
    </main>
  );
}
