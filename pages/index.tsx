import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import AskModal from "../components/AskModal";
import { DOMAINS, DomainOne } from "../utils/persona";
import router from "next/router";
import { useChatStore } from "../utils/store";
import AppBar from "../components/AppBar";
import InputWrapper from "../components/chat/InputWrapper";

export const LOCAL_ID = "solomon_uuid";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { job, user, setJob } = useChatStore();
  const [text, setText] = useState("");

  useEffect(() => {
    const localJob = localStorage.getItem("domain");
    if (localJob) setJob(localJob as DomainOne);
    else setJob(DOMAINS[0].domain);
  }, []);

  const onSubmit = useCallback(
    (inputText: string, option: number) => {
      if (!user) alert("Log in first! this is temporary message");

      console.log("전부 같지만 채팅 페이지로 이동", inputText, option);
      router.push({
        pathname: "/chat",
        query: { isFromHome: true, inputQuery: inputText, inputOption: option },
      });
    },
    [user]
  );

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
        <DomainDesc>
          <div>{DOMAINS.filter((doc) => doc.domain === job)[0]?.icon}</div>
          <p className="name">
            {DOMAINS.filter((doc) => doc.domain === job)[0]?.name}
          </p>
          <p className="domain">
            @
            {DOMAINS.filter(
              (doc) => doc.domain === job
            )[0]?.domain.toLowerCase()}
          </p>
          <p
            className="desc"
            dangerouslySetInnerHTML={{
              __html: DOMAINS.filter((doc) => doc.domain === job)[0]?.desc,
            }}
          />
        </DomainDesc>
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
                  {item.blackIcon}
                  <div className="desc">
                    {item.domain.charAt(0) + item.domain.slice(1).toLowerCase()}
                  </div>
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

const DomainDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 18px;

  .name {
    margin-top: 3px;
    font-weight: 700;
  }
  .domain {
    color: rgba(0, 0, 0, 0.6);
  }
  .desc {
    margin-top: 8px;
  }

  @media (max-width: 800px) {
    padding: 0px 25px;
  }
`;

const DescContainer = styled.div`
  padding: 10px 0px;
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.bgColor};
  transition: 3s ease;
  min-height: 100vh;
  padding-bottom: 120px;
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
  margin-top: 20px;
  // background: #00005c;
  outline: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 6px 52px;

  @media (max-width: 800px) {
    outline: none;
    padding: 0px;
  }
`;

const Card = styled.div<{ selected: boolean }>`
  width: 140px;
  height: 100px;
  border: 1px solid
    ${({ theme, selected }) => (selected ? theme.blue01 : "rgba(0,0,0,0)")};
  background: ${({ theme, selected }) =>
    selected ? "#8D9EFFCC" : theme.bgColor03};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  cursor: pointer;
  margin: 8.5px;
  transition: 0.25s ease;
  padding: 10px;
  font-weight: 700;
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.6);

  &:hover {
    background: ${({ theme, selected }) => !selected && theme.bgColor04};
    // box-shadow: 3px 10px 15px rgba(0, 0, 0, 0.1);
  }

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

  .desc {
    margin-top: 9px;
    font-weight: 600;
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

  @media (max-width: 800px) {
    width: 100px;
    height: 73px;
    font-size: 11px;
    margin: 6px;
  }
`;
