"use client";

import { Button } from "@/components/ui/button";
import { Links } from "@/config/links";
import { GetLandingPageResponse } from "@/services";
import { GlobeIcon, PackageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback } from "react";
import { CTAButton } from "./editable-cta-button";
import { EditableImage } from "./editable-image";
import { EditableLogo } from "./editable-logo";
import { VideoButton } from "./editable-video-button";
import { useLandingPageUI, useRegisterEditable } from "./landing-page.hooks";

type Props = {
  publicId: string;
  editable?: boolean;
};

export function EditableLandingPageUI({ publicId, editable = false }: Props) {
  const {
    data: landingPage,
    isLoading,
    updateLandingPage,
  } = useLandingPageUI({
    publicId,
  });

  const handleChange = useCallback(
    (name: string, value: string, sync?: boolean) => {
      updateLandingPage({
        [name]: value,
        sync,
      });
    },
    [updateLandingPage]
  );

  const handlePublish = () => {
    updateLandingPage({
      state: landingPage?.state === "draft" ? "published" : "draft",
      sync: true,
    });
  };

  if (isLoading || !landingPage) {
    return <div>Loading...</div>;
  }

  const { state } = landingPage;

  const isPublished = state === "published";

  return (
    <>
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between rounded-lg border border-border p-4">
        <p className="text-sm text-muted-foreground">
          {isPublished
            ? "Please unpublish the landing page if you want to edit it."
            : "Landing page is unpublished, you can directly edit the landing page in the content below."}
        </p>

        <div className="flex flex-col items-stretch gap-0.5">
          <Button variant="default" onClick={handlePublish}>
            {state === "published" ? "Unpublish" : "Publish"}
          </Button>

          {state === "published" && (
            <Button variant="link" className="gap-2 text-xs" asChild>
              <Link
                href={Links.LandingPage(publicId)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon className="size-3" />
                View landing page
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-4xl rounded-lg border border-border p-4">
        <LandingPageUI
          landingPage={landingPage}
          editable={editable && !isPublished}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

type LPProps = {
  landingPage: GetLandingPageResponse;
  onChange?: (name: string, value: string, sync?: boolean) => void;
  editable?: boolean;
};

export const LandingPageUI = memo(
  ({ landingPage, editable = false, onChange }: LPProps) => {
    const registerEditable = useRegisterEditable({ onChange });

    return (
      <div className="w-full text-center">
        {/* startup name */}
        <header className="my-8 flex items-center justify-center gap-4">
          <EditableLogo
            editable={editable}
            src={landingPage.startupLogo}
            width={landingPage.startupLogoWidth}
            height={landingPage.startupLogoHeight}
            onChange={(name, value) => onChange?.(name, value, true)}
          />

          <h2
            {...registerEditable(
              editable,
              "startupName",
              "my-8 text-2xl font-bold"
            )}
            dangerouslySetInnerHTML={{ __html: landingPage.startupName }}
          ></h2>
        </header>
        {/* hero title */}
        <h1
          {...registerEditable(
            editable,
            "heroTitle",
            "font-heading text-4xl font-bold"
          )}
          dangerouslySetInnerHTML={{ __html: landingPage.heroTitle }}
        ></h1>

        {/* one liner pitch */}
        <p
          {...registerEditable(
            editable,
            "oneLinerPitch",
            "my-8 text-xl leading-loose"
          )}
          dangerouslySetInnerHTML={{ __html: landingPage.oneLinerPitch }}
        />

        {/* form name/link */}

        <div className="my-12 flex items-center justify-center gap-4">
          <CTAButton
            editable={editable}
            href={landingPage.formLink}
            onChange={(name, value) => onChange?.(name, value, true)}
          >
            {landingPage.formName}
          </CTAButton>

          <VideoButton
            editable={editable}
            href={landingPage.demoVideoLink}
            onChange={(name, value) => onChange?.(name, value, true)}
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          {editable ? (
            <EditableImage
              src={landingPage.photoLink}
              onChange={(url) => onChange?.("photoLink", url)}
            />
          ) : (
            <div className="relative h-[164px] w-[302px] overflow-hidden rounded-lg bg-gray-100 md:h-[328px] md:w-[604px]">
              <Image
                fill
                src={landingPage.photoLink || "/landing-image.png"}
                alt="photo"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* key benefits */}
        <h3
          {...registerEditable(
            editable,
            "keyBenefitsHeader",
            "my-16 font-heading text-2xl font-bold"
          )}
          dangerouslySetInnerHTML={{ __html: landingPage.keyBenefitsHeader }}
        ></h3>
        <div className="grid gap-8 md:grid-cols-3 md:gap-4">
          <KeyBenefit
            editable={editable}
            idTitle="keyBenefits1Title"
            idDescription="keyBenefits1Description"
            title={landingPage.keyBenefits1Title}
            description={landingPage.keyBenefits1Description}
            registerEditable={registerEditable}
          />
          <KeyBenefit
            editable={editable}
            idTitle="keyBenefits2Title"
            idDescription="keyBenefits2Description"
            title={landingPage.keyBenefits2Title}
            description={landingPage.keyBenefits2Description}
            registerEditable={registerEditable}
          />
          <KeyBenefit
            editable={editable}
            idTitle="keyBenefits3Title"
            idDescription="keyBenefits3Description"
            title={landingPage.keyBenefits3Title}
            description={landingPage.keyBenefits3Description}
            registerEditable={registerEditable}
          />
        </div>

        <div className="my-16 flex items-center justify-center gap-4">
          <CTAButton
            size="lg"
            editable={editable}
            href={landingPage.formLink}
            onChange={(name, value) => onChange?.(name, value, true)}
          >
            {landingPage.formName}
          </CTAButton>
        </div>

        {/* features */}
        <h3
          {...registerEditable(
            editable,
            "featuresHeader",
            "my-16 font-heading text-2xl font-bold"
          )}
          dangerouslySetInnerHTML={{ __html: landingPage.featuresHeader }}
        ></h3>

        <div className="mx-auto flex max-w-lg flex-col gap-8">
          <Feature
            number={1}
            editable={editable}
            idTitle="feature1Title"
            idDescription="feature1Description"
            title={landingPage.feature1Title}
            description={landingPage.feature1Description}
            registerEditable={registerEditable}
          />
          <Feature
            number={2}
            editable={editable}
            idTitle="feature2Title"
            idDescription="feature2Description"
            title={landingPage.feature2Title}
            description={landingPage.feature2Description}
            registerEditable={registerEditable}
          />
          <Feature
            number={3}
            editable={editable}
            idTitle="feature3Title"
            idDescription="feature3Description"
            title={landingPage.feature3Title}
            description={landingPage.feature3Description}
            registerEditable={registerEditable}
          />
        </div>

        <div className="my-16 flex items-center justify-center gap-4">
          <CTAButton
            size="lg"
            editable={editable}
            href={landingPage.formLink}
            onChange={(name, value) => onChange?.(name, value, true)}
          >
            {landingPage.formName}
          </CTAButton>
        </div>
      </div>
    );
  }
);

LandingPageUI.displayName = "LandingPageUI";

function KeyBenefit({
  editable = false,
  idTitle,
  title,
  idDescription,
  description,
  registerEditable,
}: {
  editable?: boolean;
  idTitle: string;
  title: string;
  idDescription: string;
  description: string;
  registerEditable: ReturnType<typeof useRegisterEditable>;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <PackageIcon className="size-12 text-primary" />
      <div className="flex flex-col gap-2">
        <h4
          {...registerEditable(editable, idTitle, "text-base font-bold")}
          dangerouslySetInnerHTML={{ __html: title }}
        ></h4>
        <p
          {...registerEditable(editable, idDescription, "text-sm")}
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </div>
  );
}

function Feature({
  number,
  editable = false,
  idTitle,
  title,
  idDescription,
  description,
  registerEditable,
}: {
  number: number;
  editable?: boolean;
  idTitle: string;
  title: string;
  idDescription: string;
  description: string;
  registerEditable: ReturnType<typeof useRegisterEditable>;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-px flex size-6 min-h-6 min-w-6 items-center justify-center rounded-full  border border-primary font-bold">
        {number}
      </span>
      <div className="flex flex-col items-start justify-start gap-2">
        <h4
          {...registerEditable(editable, idTitle, "text-xl font-bold")}
          dangerouslySetInnerHTML={{ __html: title }}
        ></h4>
        <p
          {...registerEditable(editable, idDescription, "text-base text-left")}
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </div>
  );
}
