import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  Button,
  Divider,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Footer from "../components/Footer";
import AskModal from "../components/AskModal";
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
import Link from "next/link";
import { personas } from "../utils/persona";
import router from "next/router";
import { useChatStore } from "../utils/store";

export const LOCAL_ID = "solomon_uuid";

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

type DomainType = {
  icon: React.ReactNode;
  domain: DomainOne;
  id: number;
};

const DOMAINS: DomainType[] = [
  {
    icon: <StarIcon />,
    domain: DomainOne.DEVELOPER,
    id: 1,
  },
  {
    icon: <QuestionOutlineIcon />,
    domain: DomainOne.MEDICINE,
    id: 2,
  },
  {
    icon: <MoonIcon />,
    domain: DomainOne.LAW,
    id: 3,
  },
  {
    icon: <LinkIcon />,
    domain: DomainOne.HISTORY,
    id: 4,
  },
  {
    icon: <EditIcon />,
    domain: DomainOne.HEALTH,
    id: 5,
  },
  {
    icon: <BellIcon />,
    domain: DomainOne.FARM,
    id: 6,
  },
  {
    icon: <ChatIcon />,
    domain: DomainOne.PHYSICS,
    id: 7,
  },
  {
    icon: <StarIcon />,
    domain: DomainOne.MATH,
    id: 8,
  },
];

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setJob } = useChatStore();

  return (
    <>
      <Head>
        <title>Lottery</title>
        <meta name="description" content="Lottery will give you solution" />
        <link rel="icon" href="/card.png" />
      </Head>

      <MainContainer>
        <div className="logo">
          <Image src="/card.png" width={40} height={40} alt="logo" />
          <span>Lottery</span>
          <span className="beta">Beta</span>
        </div>
        <p>Quora through conversational AI.</p>
        <p>You can ask and get answer directly, with no ads.</p>
        <TopCardContainer>
          <div className="left">
            <span>
              <Image src="/lightning.png" width={30} height={30} alt="fire" />
            </span>
            <span>See my history</span>
          </div>
          <div>
            <ArrowRightIcon />
          </div>
        </TopCardContainer>
        <p>choose what kind of domain of your question?</p>
        <p>We will introduce you best expert</p>
        <CardsContainer>
          {DOMAINS.map((item) => {
            return (
              <Card
                key={item.id}
                onClick={() => {
                  setJob(item.domain);
                  router.push({
                    pathname: "/ask",
                  });
                }}>
                <div className="wrapper">
                  {item.icon}
                  <p>{item.domain}</p>
                </div>
                <div className="persona">
                  {personas.filter((doc) => doc.job === item.domain)[0].name}
                </div>
              </Card>
            );
          })}
        </CardsContainer>
      </MainContainer>
      <AskModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Footer />
    </>
  );
};

export default Home;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bgColor};
  transition: 3s ease;
  min-height: 100vh;
  padding-bottom: 450px;
  padding-top: 120px;

  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    span {
      font-size: 2em;
      font-weight: 900;
      margin-left: 10px;
      word-spacing: 20px;
    }

    .beta {
      font-size: 1em;
      font-weight: 600;
      padding: 1px 8px;
      color: white;
      background: ${({ theme }) => theme.blue01};
    }
  }

  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 180px;
  height: 170px;
  border: 1px solid ${({ theme }) => theme.borderColor01};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 10px;
  transition: 0.5s ease;
  padding: 10px;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  svg {
    width: 100px;
  }

  p {
    margin-top: 16px;
    font-weight: 700;
    font-size: 1.1em;
  }

  .persona {
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.08);
    width: 80%;
    margin-top: 10px;
    padding: 3px;
    font-size: 0.9em;
    text-align: center;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.borderColor};
    box-shadow: 3px 10px 15px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 420px) {
    width: 140px;
    height: 110px;
    p {
      margin-top: 10px;
    }
  }
`;

const TopCardContainer = styled.div`
  margin-top: 60px;
  padding: 15px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor01};
  width: 100%;
  margin-bottom: 30px;
  font-size: 1.2em;
  font-weight: 700;

  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    span {
      margin-left: 10px;
    }
  }
`;
