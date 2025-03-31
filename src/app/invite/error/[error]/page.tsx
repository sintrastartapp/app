import { TriangleAlert } from "lucide-react";

type Props = {
  params: {
    error: string;
  };
};

const inviteErrorMessages: Record<string, string> = {
  invalid: "The invitation link is not valid.",
  "not-found": "The invitation link is not valid.",
  expired: "The invitation link has expired.",
  "not-your-invite": "You are not invited to this project.",
};

export default function InviteErrorPage({ params }: Props) {
  const message =
    inviteErrorMessages[params.error] || inviteErrorMessages.invalid;

  return (
    <main className="flex size-full min-h-screen flex-col items-center justify-center gap-8">
      <TriangleAlert className="size-12 text-red-500" />
      <p className="text-center font-heading text-2xl font-bold text-primary">
        {message}
      </p>
    </main>
  );
}
