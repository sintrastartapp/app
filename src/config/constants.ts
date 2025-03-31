import { env } from "./env-config";

type Site = {
  name: string;
  tagline: string;
  url: string;
  links: {
    github: string;
    youtubeOverview: string;
    youtubeDemos: string;
    feedbackUrl: string;
    slackUrl: string;
    learningHubUrl: string;
    supportEmail: string;
  };
  projects: {
    startingMessage: string;
    exampleDescription: string;
  };
  feedbackLinks: {
    theProblem: string;
    developmentPhase: string;
    gotoMarket: string;
    funding: string;
  };
};

export const site: Site = {
  name: "StartUp Sintra",
  tagline: "Incubadora Tecnológica, transformar ideias em negócios",
  // tagline: "from idea to unicorn - together",
  url: env.NEXT_PUBLIC_URL,
  links: {
    github: "https://github.com/redpangilinan/next-entree",
    youtubeOverview: "5pa4JjsQPCU",
    youtubeDemos:
      "https://www.youtube.com/playlist?list=PLDNr3HhmJN2XBfIR1rgeTmt_gm3KSrEal",
    feedbackUrl:
      "https://a.sprig.com/R2NGX2hTLXJWUzJmfnNpZDozMWYyNTllYS0zYjkwLTRlYTgtOWY0MC1hNzVjZjMwNGJmZjQ=",
    slackUrl:
      "https://join.slack.com/t/appvc/shared_invite/zt-249zvkklx-tMFhYJMdTuuLnj1g0AzbQA",
    learningHubUrl:
      "https://dozerolearning.notion.site/11f851d08402808882f5ebdde4ed437b?v=28c97bab5feb44df85e7adcfeb5cb648",
    supportEmail: env.NEXT_PUBLIC_SUPPORT_EMAIL,
  },
  projects: {
    startingMessage: "Let's start",
    exampleDescription:
      "My project is a mobile application that helps users track their daily water intake and reminds them to stay hydrated throughout the day. The app also allows users to set personalized goals and provides tips on how to increase their water consumption. Additionally, it has a feature that tracks the environmental impact of plastic water bottle usage and encourages users to switch to reusable bottles. The ultimate goal of this project is to promote healthy habits and reduce plastic waste.",
  },
  feedbackLinks: {
    theProblem:
      "https://a.sprig.com/R2NGX2hTLXJWUzJmfnNpZDpjODc0NDIwYi1kNzBhLTQ3ZTMtOGI3My0yMTY2ZWNlYTM5Mzg=",
    developmentPhase:
      "https://a.sprig.com/R2NGX2hTLXJWUzJmfnNpZDozNzNmOWY1Yy0yZGU3LTQ0MWItYjgwZC02YTg4NTRhMWVlMDM=",
    gotoMarket:
      "https://a.sprig.com/R2NGX2hTLXJWUzJmfnNpZDpkZmQ2OWMyMi0wMDVlLTQ2MjYtODQ0Zi1kODgzYTIxMDc3Mzc=",
    funding:
      "https://a.sprig.com/R2NGX2hTLXJWUzJmfnNpZDpkNjk4ZjRlOC0wYmQ4LTQzZTItYjE5ZS04ZmJlZGUxMmM2ZWI=",
  },
};
