import { site } from "@/config/constants";
import { env } from "@/config/env-config";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface InviteUserEmailProps {
  inviteEmail?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  projectName?: string;
  inviteLink?: string;
}

const baseUrl = env.EMAIL_PUBLIC_URL ? env.EMAIL_PUBLIC_URL : "";

export const InviteUserEmail = ({
  inviteEmail,
  invitedByUsername,
  invitedByEmail,
  projectName,
  inviteLink,
}: InviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on ${site.name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/d-logo.png`}
                width="90"
                height="108"
                alt={site.name}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>{projectName}</strong> on{" "}
              <strong>{site.name}</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{projectName}</strong> project on{" "}
              <strong>{site.name}</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Join the project
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-center text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for{" "}
              <span className="text-black">{inviteEmail}</span>. If you were not
              expecting this invitation, you can ignore this email. If you are
              concerned about your account&apos;s safety, please reply to this
              email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

InviteUserEmail.PreviewProps = {
  inviteEmail: "invited@app.vc",
  inviteLink: "https://app.com/teams/invite/foo",
  invitedByPhoto: "",
  invitedByUsername: "André Alves",
  invitedByEmail: "email@app.vc",
  projectName: "app.vc",
} as InviteUserEmailProps;

export default InviteUserEmail;
