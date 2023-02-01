import { DomainOne } from "./persona";

export type PromptType = {
  text: string;
  tag: number;
  domain: string;
};

export const prompts: PromptType[] = [
  {
    text: "including some examples",
    tag: 1,
    domain: DomainOne.SCIENCE,
  },
  {
    text: "in one sentence",
    tag: 2,
    domain: DomainOne.SCIENCE,
  },
  {
    text: "without a mathematical formula",
    tag: 3,
    domain: DomainOne.SCIENCE,
  },
  {
    text: "with only codes",
    tag: 1,
    domain: DomainOne.SOFTWARE,
  },
  {
    text: "with codes and descriptions",
    tag: 2,
    domain: DomainOne.SOFTWARE,
  },
  {
    text: "without codes",
    tag: 3,
    domain: DomainOne.SOFTWARE,
  },
  {
    text: "explain it in detail ",
    tag: 1,
    domain: DomainOne.HEALTH,
  },
  {
    text: "including some examples",
    tag: 2,
    domain: DomainOne.HEALTH,
  },
  {
    text: "including scientific or biological information",
    tag: 3,
    domain: DomainOne.HEALTH,
  },
  {
    text: "explain it in detail ",
    tag: 1,
    domain: DomainOne.MEDICAL,
  },
  {
    text: "including home remedies",
    tag: 2,
    domain: DomainOne.MEDICAL,
  },
  {
    text: "including scientific or biological information",
    tag: 3,
    domain: DomainOne.MEDICAL,
  },
  {
    text: "explain it in detail",
    tag: 1,
    domain: DomainOne.LAW,
  },
  {
    text: "explain it as a table",
    tag: 2,
    domain: DomainOne.LAW,
  },
  {
    text: "including actual precedents",
    tag: 3,
    domain: DomainOne.LAW,
  },
  {
    text: "explain in detail",
    tag: 1,
    domain: DomainOne.BUSINESS,
  },
  {
    text: "explain it as a table",
    tag: 2,
    domain: DomainOne.BUSINESS,
  },
  {
    text: "focusing on the startup contents",
    tag: 3,
    domain: DomainOne.BUSINESS,
  },
  {
    text: "explain it in detail",
    tag: 1,
    domain: DomainOne.MUSIC,
  },
  {
    text: "explain it as a table",
    tag: 2,
    domain: DomainOne.MUSIC,
  },
  {
    text: "including professional musical knowledge",
    tag: 3,
    domain: DomainOne.MUSIC,
  },
  {
    text: "explain it in detail",
    tag: 1,
    domain: DomainOne.ART,
  },
  {
    text: "explain it as a table",
    tag: 2,
    domain: DomainOne.ART,
  },
  {
    text: "including professional art knowledge",
    tag: 3,
    domain: DomainOne.ART,
  },
  {
    text: "explain it in detail",
    tag: 1,
    domain: DomainOne.HISTORY,
  },
  {
    text: "explain it as a table",
    tag: 2,
    domain: DomainOne.HISTORY,
  },
  {
    text: "explain according to the passage of time.",
    tag: 3,
    domain: DomainOne.HISTORY,
  },
  {
    text: "including some examples",
    tag: 1,
    domain: DomainOne.COMMONSENSE,
  },
  {
    text: "including some tips",
    tag: 2,
    domain: DomainOne.COMMONSENSE,
  },
  {
    text: "specialized in cooking and cleaning",
    tag: 3,
    domain: DomainOne.COMMONSENSE,
  },
  {
    text: "explain it in detail",
    tag: 1,
    domain: DomainOne.PHILOSOPHY,
  },
  {
    text: "Including the theories of past philosophers",
    tag: 2,
    domain: DomainOne.PHILOSOPHY,
  },
  {
    text: "Including knowledge of various philosophical beliefs from different countries.",
    tag: 3,
    domain: DomainOne.PHILOSOPHY,
  },
  {
    text: "explain it in detail",
    tag: 1,
    domain: DomainOne.AGRICULTURE,
  },
  {
    text: "including practical tips to help",
    tag: 2,
    domain: DomainOne.AGRICULTURE,
  },
  {
    text: "explain it as a table",
    tag: 3,
    domain: DomainOne.AGRICULTURE,
  },
];
