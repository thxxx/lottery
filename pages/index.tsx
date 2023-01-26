import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import AskModal from "../components/AskModal";
import { DOMAINS } from "../utils/persona";
import router from "next/router";
import { useChatStore } from "../utils/store";
import AppBar from "../components/AppBar";
import InputWrapper from "../components/chat/InputWrapper";

export const LOCAL_ID = "solomon_uuid";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { job, setJob } = useChatStore();
  const [text, setText] = useState("");

  const onSubmit = useCallback(() => {
    console.log("전부 같지만 채팅 페이지로 이동");
    router.push({
      pathname: "/chat",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Lottery</title>
        <meta name="description" content="Lottery will give you solution" />
        <link rel="icon" href="/card.png" />
      </Head>
      <AppBar page="main" />
      <MainContainer>
        <div className="logo">
          <Image src="/card.png" width={30} height={30} alt="logo" />
          <span>Lottery</span>
          <span className="beta">Beta</span>
        </div>
        <p>Quora through conversational AI.</p>
        <p>You can ask and get answer directly, with no ads.</p>
        <div>{DOMAINS.filter((doc) => doc.domain === job)[0]?.name}</div>
        {/* <TopCardContainer>
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
        <p>We will introduce you best expert</p> */}
        <CardsContainer>
          {DOMAINS.map((item) => {
            return (
              <Card
                key={item.id}
                onClick={() => {
                  setJob(item.domain);
                  localStorage.setItem("domain", item.domain);
                }}
                selected={item.domain === job}>
                <div className="wrapper">
                  {item.icon}
                  <p>{item.domain}</p>
                </div>
              </Card>
            );
          })}
        </CardsContainer>
      </MainContainer>
      <InputWrapper onSubmit={onSubmit} text={text} setText={setText} />
      <AskModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
};

export default Home;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.bgColor};
  transition: 3s ease;
  min-height: 100vh;
  padding-bottom: 150px;
  padding-top: 80px;

  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    span {
      font-size: 1.7em;
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

const Card = styled.div<{ selected: boolean }>`
  width: 180px;
  height: 100px;
  border: 1px solid
    ${({ theme, selected }) => (selected ? theme.blue01 : theme.borderColor01)};
  background: ${({ theme }) => theme.borderColor01};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 7px;
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
    border: 1px solid
      ${({ theme, selected }) => (selected ? theme.blue01 : theme.borderColor)};
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
