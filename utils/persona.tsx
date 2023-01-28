import Image from "next/image";

export enum DomainOne {
  MUSIC = "MUSIC",
  MEDICAL = "MEDICAL",
  SOFTWARE = "SOFTWARE",
  LAW = "LAW",
  MEDICINE = "MEDICINE",
  AGRICULTURE = "AGRICULTURE",
  HEALTH = "HEALTH",
  HISTORY = "HISTORY",
  SCIENCE = "SCIENCE",
  ART = "ART",
  COMMONSENSE = "COMMONSENSE",
  BUSINESS = "BUSINESS",
  PHILOSOPHY = "PHILOSOPHY",
}

export type DomainType = {
  icon: React.ReactNode;
  domain: DomainOne;
  id: number;
  name: string;
  desc: string;
  blackIcon: React.ReactNode;
};

const WIDTH = 40;
const HEIGHT = 40;
const WIDTHB = 20;
const HEIGHTB = 20;

export const DOMAINS: DomainType[] = [
  {
    blackIcon: (
      <Image
        src="/music_black.png"
        alt="music"
        width={WIDTHB}
        height={HEIGHTB}
      />
    ),
    icon: <Image src="/music.png" alt="music" width={WIDTH} height={HEIGHT} />,
    domain: DomainOne.MUSIC,
    id: 1,
    name: "Elizabeth",
    desc: "Hello, I am Elizabeth, a musician. I am good at music theory.  \
          Also, I have various knowledge such as music history and musical instruments.",
  },
  {
    blackIcon: (
      <Image
        src="/philosophy_black.png"
        alt="philosophy"
        width={WIDTHB}
        height={HEIGHTB}
      />
    ),
    icon: (
      <Image
        src="/philosophy.png"
        alt="philosophy"
        width={WIDTH}
        height={HEIGHT}
      />
    ),
    domain: DomainOne.PHILOSOPHY,
    id: 2,
    name: "Amelia",
    desc: "Hello, I am Amelia. I'm a philosopher. \
        You're always welcome if you want to have a philosophical conversation with me.",
  },
  {
    icon: <Image src="/law.png" alt="law" width={WIDTH} height={HEIGHT} />,
    blackIcon: (
      <Image src="/law_black.png" alt="law" width={WIDTHB} height={HEIGHTB} />
    ),
    domain: DomainOne.LAW,
    id: 3,
    name: "Olivia",
    desc: "Hello, I am Olivia. I know a lot of law knowledge.  \
      I'm an AI expert, so it's not always right for me to answer. But I can help you.",
  },
  {
    blackIcon: (
      <Image
        src="/history_black.png"
        alt="history"
        width={WIDTHB}
        height={HEIGHTB}
      />
    ),
    icon: (
      <Image src="/history.png" alt="history" width={WIDTH} height={HEIGHT} />
    ),
    domain: DomainOne.HISTORY,
    id: 4,
    name: "Tom",
    desc: "Hello, I am Daniel. I know a lot of history knowledge.  \
          I know every country's history well, so ask me anything.",
  },
  {
    blackIcon: (
      <Image
        src="/health_black.png"
        alt="health"
        width={WIDTHB}
        height={HEIGHTB}
      />
    ),
    icon: (
      <Image src="/health.png" alt="health" width={WIDTH} height={HEIGHT} />
    ),
    domain: DomainOne.HEALTH,
    id: 5,
    name: "Michael",
    desc: "Hello, I am Michael. I know a lot of health knowledge.  \
        I am interested in health and I am also an expert in various sports such as soccer and basketball.",
  },
  {
    icon: (
      <Image
        src="/agriculture.png"
        alt="agriculture"
        width={WIDTH}
        height={HEIGHT}
      />
    ),
    blackIcon: (
      <Image
        src="/agriculture_black.png"
        alt="agriculture"
        width={WIDTHB}
        height={HEIGHTB}
      />
    ),
    domain: DomainOne.AGRICULTURE,
    id: 6,
    name: "Joseph",
    desc: "Hello, I am Joseph. I specialize in agriculture. \
        Ask me whenever you want about farming.",
  },
  {
    icon: (
      <Image src="/science.png" alt="science" width={WIDTH} height={HEIGHT} />
    ),
    blackIcon: (
      <Image
        src="/science_black.png"
        alt="science"
        width={WIDTHB}
        height={HEIGHTB}
      />
    ),
    domain: DomainOne.SCIENCE,
    id: 7,
    name: "Emma",
    desc: "Hello, I am Emma. I know a lot of scientific knowledge.  \
          Also, I am good at explaining using formulas unlike other friends.",
  },
  {
    icon: <Image src="/art.png" alt="art" width={WIDTH} height={HEIGHT} />,
    blackIcon: (
      <Image src="/art_black.png" alt="art" width={WIDTHB} height={HEIGHTB} />
    ),
    domain: DomainOne.ART,
    id: 8,
    name: "Andrew",
    desc: "Hello, I am Andrew.I'm very interested in art. \
        I'm the next Picasso. That's how serious I am about art.",
  },
  {
    icon: (
      <Image src="/business.png" alt="business" width={WIDTH} height={HEIGHT} />
    ),
    blackIcon: (
      <Image
        src="/business_black.png"
        alt="business"
        width={WIDTHB}
        height={HEIGHTB}
      />
    ),
    domain: DomainOne.BUSINESS,
    id: 9,
    name: "Metthew",
    desc: "Hello, I am Matthew. I'm an entrepreneur.  \
        I am an experienced professional in the business industry. Ask me anything.",
  },
  {
    icon: (
      <Image
        src="/commonsense.png"
        alt="commonsense"
        width={WIDTH}
        height={HEIGHT}
      />
    ),
    blackIcon: (
      <Image
        src="/commonsense_black.png"
        alt="commonsense"
        width={WIDTHB}
        height={HEIGHTB}
      />
    ),
    domain: DomainOne.COMMONSENSE,
    id: 10,
    name: "Shopia",
    desc: "Hello, I am Shopia. I know a lot of miscellaneous knowledge.  \
        I know all the knowledge necessary for life, such as cooking and cleaning.",
  },
  {
    icon: (
      <Image src="/software.png" alt="software" width={WIDTH} height={HEIGHT} />
    ),
    blackIcon: (
      <Image
        src="/software_black.png"
        alt="software"
        width={WIDTHB}
        height={HEIGHTB}
      />
    ),
    domain: DomainOne.SOFTWARE,
    id: 11,
    name: "Noah",
    desc: "Hello, I am Noah. I know a lot of programming knowledge. Unlike other kids, I can make code and modify it for you.",
  },
  {
    icon: (
      <Image src="/medical.png" alt="medical" width={WIDTH} height={HEIGHT} />
    ),
    blackIcon: (
      <Image
        src="/medical_black.png"
        alt="medical"
        width={WIDTHB}
        height={HEIGHTB}
      />
    ),
    domain: DomainOne.MEDICAL,
    id: 12,
    name: "Liam",
    desc: "Hello, I am Liam. I know a lot of medical knowledge.  \
          I can't get the exact medical treatment and I can give you simple help.",
  },
];

import React from "react";

const PersonaTemp = () => {
  return <div>persona</div>;
};

export default PersonaTemp;
