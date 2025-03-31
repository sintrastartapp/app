import { site } from "@/config/constants";
import { getUserOrRedirect } from "@/lib/auth";
import { redirect, RedirectType } from "next/navigation";
import { OnboardingHeader } from "./components/header";
import { OnboardingForm } from "./components/onboarding-form";

export default async function OnboardingPage() {
  const user = await getUserOrRedirect({ redirectToOnboarding: false });

  if (user?.onboardingCompleted) {
    redirect("/", RedirectType.replace);
  }

  return (
    <main className="flex min-h-screen flex-col justify-center">
      <OnboardingHeader />
      <div className="container mx-auto flex-1 py-8">
        <div className="mb-12 flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">
            Let&apos;s get started by learning a bit about your startup or idea
          </h1>
          <h3 className="text-base">
            Answering a few questions will make sure {site.name} works perfectly
            for you every time.
          </h3>
        </div>

        <div className="max-w-lg">
          <OnboardingForm />
        </div>
      </div>
    </main>
  );
}
