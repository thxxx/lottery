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

const WIDTH = 45;
const HEIGHT = 45;
const WIDTHB = 20;
const HEIGHTB = 20;

export const DOMAINS: DomainType[] = [
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
    desc: "Hello, I am Emma. I know a lot of scientific knowledge.  <br /> \
          Also, I am good at explaining using formulas unlike other friends.",
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
    desc: "Hello, I am Noah. I know a lot of programming knowledge. <br /> \
          Unlike other kids, I can make code and modify it for you.",
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
    desc: "Hi, I am Michael. I have extensive knowledge in the field of health and hold a strong interest in the topic. <br /> Additionally, I am an expert in various sports including soccer and basketball.",
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
    desc: "Hi, I am Matthew. I am an accomplished entrepreneur with expertise in the business field.\
          Feel free to ask me any questions.",
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
    desc: "Hello, I am Amelia. I'm a philosopher. <br /> \
        You're always welcome if you want to have a philosophical conversation with me.",
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
    desc: "Hi, I am Shopia. I have a wide range of miscellaneous knowledge <br /> \
          including practical skills for everyday living such as cooking and cleaning.",
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
    desc: "Hello, I am Daniel. I know a lot of history knowledge.  <br /> \
          I know every country's history well, so ask me anything.",
  },
  {
    icon: <Image src="/art.png" alt="art" width={WIDTH} height={HEIGHT} />,
    blackIcon: (
      <Image src="/art_black.png" alt="art" width={WIDTHB} height={HEIGHTB} />
    ),
    domain: DomainOne.ART,
    id: 8,
    name: "Andrew",
    desc: "Hi, I'm Andrew and I have a passion for art. <br /> \
I take my art very seriously and am dedicated to becoming the next Picasso.",
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
    desc: "Hi, I am Liam. I possess substantial knowledge in the field of medicine. <br /> \
            While I am not able to provide specific medical treatment, I can offer simple assistance.",
  },
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
    desc: "Hi, I am Elizabeth, a talented musician with a strong understanding of music theory.  <br/> \
  In addition, I possess a diverse range of knowledge including music history and proficiency ",
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
    desc: "Hello, I am Joseph. I specialize in agriculture. <br /> \
        Ask me whenever you want about farming.",
  },
  {
    icon: <Image src="/law.png" alt="law" width={WIDTH} height={HEIGHT} />,
    blackIcon: (
      <Image src="/law_black.png" alt="law" width={WIDTHB} height={HEIGHTB} />
    ),
    domain: DomainOne.LAW,
    id: 3,
    name: "Olivia",
    desc: "Hi, my name is Olivia. I have extensive knowledge in the field of law. <br /> \
            I am willing to assist you to the best of my ability.",
  },
];

import React from "react";

const PersonaTemp = () => {
  return <div>persona</div>;
};

export default PersonaTemp;
