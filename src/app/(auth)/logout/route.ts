import { deleteSession } from "@/lib/auth/sessions";

export async function GET(): Promise<Response> {
  try {
    await deleteSession();

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  } catch {
    return new Response("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}
