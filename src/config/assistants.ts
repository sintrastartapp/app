import { CriticalHypothesisAssistant } from "./assistants/critical-hypothesis";
import { CustomerInterviewAssistant } from "./assistants/customer-interview";
import { ElevatorPitchAssistant } from "./assistants/elevator-pitch";
import { EmailBlurbAssistant } from "./assistants/email-blurb";
import { FinancialModelAssistant } from "./assistants/financial-model";
import { GotoMarketFrameworkAssistant } from "./assistants/goto-market-framework";
import { IdealCustomerProfileAssistant } from "./assistants/ideal-customer-profile";
import { InvestmentDeckAssistant } from "./assistants/investment-deck";
import { KpiTreeAssistant } from "./assistants/kpi-tree";
import { LeanCanvasAssistant } from "./assistants/lean-canvas";
import { OnePagerAssistant } from "./assistants/one-pager";
import { PirateMetricsAssistant } from "./assistants/pirate-metrics";
import { PitchStoryAssistant } from "./assistants/pitch-story";
import { PrdAssistant } from "./assistants/prd";
import { ProductDiscoveryAssistant } from "./assistants/product-discovery";
import { ProductOkrsAssistant } from "./assistants/product-okrs";
import { SwotAnalysisAssistant } from "./assistants/swot-analysis";
import { Assistant } from "./assistants/types.d";
import { UserStoriesAssistant } from "./assistants/user-stories";

export const assistants = {
  leanCanvas: LeanCanvasAssistant,
  criticalHypothesis: CriticalHypothesisAssistant,
  customerInterview: CustomerInterviewAssistant,
  elevatorPitch: ElevatorPitchAssistant,
  financialModel: FinancialModelAssistant,
  gotoMarketFramework: GotoMarketFrameworkAssistant,
  idealCustomerProfile: IdealCustomerProfileAssistant,
  investmentDeck: InvestmentDeckAssistant,
  kpiTree: KpiTreeAssistant,
  onePager: OnePagerAssistant,
  pitchStory: PitchStoryAssistant,
  prd: PrdAssistant,
  productDiscovery: ProductDiscoveryAssistant,
  productOkrs: ProductOkrsAssistant,
  swotAnalysis: SwotAnalysisAssistant,
  userStories: UserStoriesAssistant,
  pirateMetrics: PirateMetricsAssistant,
  emailBlurb: EmailBlurbAssistant,
};

export type AssistantType = keyof typeof assistants;

export const assistantsByIds = Object.values(assistants).reduce(
  (acc, assistant) => {
    acc[assistant.id] = assistant;
    return acc;
  },
  {} as Record<string, Assistant>
);

export function getAgentBySlug(slug: string) {
  return Object.values(assistants).find((a) => a.slug === slug);
}

export function getAgentById(id: string) {
  return assistantsByIds[id];
}

export * from "./assistants/types.d";
