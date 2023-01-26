import {
  ArrowRightIcon,
  StarIcon,
  QuestionOutlineIcon,
  MoonIcon,
  LinkIcon,
  EditIcon,
  BellIcon,
  ChatIcon,
} from "@chakra-ui/icons";

export enum DomainOne {
  DEVELOPER = "DEVELOPER",
  LAW = "LAW",
  MEDICINE = "MEDICINE",
  FARM = "FARM",
  HEALTH = "HEALTH",
  HISTORY = "HISTORY",
  PHYSICS = "PHYSICS",
  MATH = "MATH",
}

export type DomainType = {
  icon: React.ReactNode;
  domain: DomainOne;
  id: number;
  name: string;
  desc: string;
};

export const DOMAINS: DomainType[] = [
  {
    icon: <StarIcon />,
    domain: DomainOne.DEVELOPER,
    id: 1,
    name: "Tom",
    desc: "He is brilliant",
  },
  {
    icon: <QuestionOutlineIcon />,
    domain: DomainOne.MEDICINE,
    id: 2,
    name: "Tom",
    desc: "He is brilliant",
  },
  {
    icon: <MoonIcon />,
    domain: DomainOne.LAW,
    id: 3,
    name: "Tom",
    desc: "He is brilliant",
  },
  {
    icon: <LinkIcon />,
    domain: DomainOne.HISTORY,
    id: 4,
    name: "Tom",
    desc: "He is brilliant",
  },
  {
    icon: <EditIcon />,
    domain: DomainOne.HEALTH,
    id: 5,
    name: "Tom",
    desc: "He is brilliant",
  },
  {
    icon: <BellIcon />,
    domain: DomainOne.FARM,
    id: 6,
    name: "Tom",
    desc: "He is brilliant",
  },
  {
    icon: <ChatIcon />,
    domain: DomainOne.PHYSICS,
    id: 7,
    name: "Tom",
    desc: "He is brilliant",
  },
  {
    icon: <StarIcon />,
    domain: DomainOne.MATH,
    id: 8,
    name: "Tom",
    desc: "He is brilliant",
  },
  {
    icon: <EditIcon />,
    domain: DomainOne.HEALTH,
    id: 9,
    name: "Tom",
    desc: "He is brilliant",
  },
  {
    icon: <BellIcon />,
    domain: DomainOne.FARM,
    id: 10,
    name: "Tom",
    desc: "He is brilliant",
  },
  {
    icon: <ChatIcon />,
    domain: DomainOne.PHYSICS,
    id: 11,
    name: "Tom",
    desc: "He is brilliant",
  },
  {
    icon: <StarIcon />,
    domain: DomainOne.MATH,
    id: 12,
    name: "Tom",
    desc: "He is brilliant",
  },
];
