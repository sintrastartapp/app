export type Assistant = {
  id: string;
  name: string;
  slug: string;
  examples?: AssistantExample;
};

export type AssistantExample = {
  title?: string;
  tabs: AssistantExampleTab[];
};

export type AssistantExampleTab = {
  name?: string;
  title?: string;
  embeddedId?: string;
  description: string;
};
