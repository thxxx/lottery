import { DomainOne } from "./persona";

export type PromptType = {
  text: string;
  tag: number;
  domain: string;
};

export const prompts: PromptType[] = [
  {
    text: "PROMPT1",
    tag: 0,
    domain: "default",
  },
  {
    text: "PROMPT2",
    tag: 1,
    domain: "default",
  },
  {
    text: "PROMPT3",
    tag: 2,
    domain: "default",
  },
  {
    text: "PROMPT4",
    tag: 3,
    domain: DomainOne.SCIENCE,
  },
  {
    text: "PROMPT5",
    tag: 4,
    domain: DomainOne.SCIENCE,
  },
  {
    text: "PROMPT6",
    tag: 5,
    domain: DomainOne.SCIENCE,
  },
];
