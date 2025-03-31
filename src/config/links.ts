export const Links = {
  Root: "https://app.vc",
  Home: "/",
  TermsOfUse: "https://app.vc/terms",
  PrivacyPolicy: "https://app.vc/privacy",
  AccountProfile: "/account/profile",
  AccountTeams: "/account/teams",
  AccountBilling: "/account/billing",
  Login: "/login",
  LoginWithGoogle: "/login/google",
  LogOut: "/logout",
  Onboarding: "/onboarding",
  AccountProjects: "/account/projects",
  AccountCreateProject: "/account/projects/create",
  AccountAdminDash: "/account/admin/dash",
  AccountAdminChat(chatId: string) {
    return `/account/admin/chats/${chatId}`;
  },
  InviteErrorInvalid: "/invite/error/invalid",
  InviteErrorNotFound: "/invite/error/not-found",
  InviteErrorNotYourInvite: "/invite/error/not-your-invite",
  InviteLink(id: string): string {
    return `/invite/${id}`;
  },
  AccountProjectSettings(projectId: string): string {
    return `/account/projects/${projectId}/settings`;
  },
  AccountProjectMembers(projectId: string): string {
    return `/account/projects/${projectId}/members`;
  },
  AccountProjectInvite(projectId: string): string {
    return `/account/projects/${projectId}/invite`;
  },
  Project(projectId: string): string {
    return `/${projectId}`;
  },
  ProjectHome(projectId: string): string {
    return `/${projectId}/home`;
  },
  ProjectTheProblem(projectId: string, section: string = "home"): string {
    return [`/${projectId}/the-problem`, section].filter(Boolean).join("/");
  },
  ProjectTheProblemValidationExperiments(
    projectId: string,
    experimentId: string
  ): string {
    return [`/${projectId}/the-problem/validation-experiments`, experimentId]
      .filter(Boolean)
      .join("/");
  },
  ProjectDevelopmentPhase(projectId: string, section: string = "home"): string {
    return [`/${projectId}/development-phase`, section]
      .filter(Boolean)
      .join("/");
  },
  ProjectGoToMarket(projectId: string, section: string = "home"): string {
    return [`/${projectId}/go-to-market`, section].filter(Boolean).join("/");
  },
  ProjectFunding(projectId: string, section: string = "home"): string {
    return [`/${projectId}/funding`, section].filter(Boolean).join("/");
  },
  ProjectConnect(projectId: string): string {
    return `/${projectId}/connect`;
  },
  ShareDocumentLink(docId: string): string {
    return `/share/document/${docId}`;
  },
  LandingPage(publicId: string): string {
    return `/lp/${publicId}`;
  },
};
