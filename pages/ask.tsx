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
  ArrowForwardIcon,
  ArrowRightIcon,
  Search2Icon,
  StarIcon,
} from "@chakra-ui/icons";
import router from "next/router";
import { useChatStore } from "../utils/store";
import { authService, firebaseInstance } from "../utils/fbase";

const AskPage: NextPage = () => {
  const [text, setText] = useState("");
  const [isChatting, setIsChatting] = useState(false);
  const { job, user } = useChatStore();

  const doSubmit = () => {
    router.push({
      pathname: "/chat",
    });
  };

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
        <div className="expert">{job} Expert</div>
        <InputContainer
          onSubmit={(e) => {
            e.preventDefault();
            doSubmit();
          }}>
          <Search2Icon className="search" color="gray.400" />
          <Input
            placeholder="Please ask..."
            value={text}
            onChange={(e) => {
              setText(e.currentTarget.value);
            }}
          />
          <Button
            className="send"
            onClick={() => {
              doSubmit();
            }}>
            <ArrowForwardIcon className="send_icon" color="white" />
          </Button>
        </InputContainer>
        <TopCardContainer>
          <div className="left">
            <span>
              <Image src="/fire.png" width={30} height={30} alt="fire" />
            </span>
            <span>Popular Now</span>
          </div>
          <div>
            <ArrowRightIcon />
          </div>
        </TopCardContainer>
        <ExampleContainer>
          <Example>
            <div className="question">Hey I am hungry</div>
            <div className="answer">
              Get some food! You are gonna eat hamburger or any kind of ramen is
              good. Do you want something special? I think Its red
            </div>
          </Example>
          <Example>
            <div className="question">Hey I am hungry</div>
            <div className="answer">
              Get some food! You are gonna eat hamburger or any kind of ramen is
              good. Do you want something special? I think Its red
            </div>
          </Example>
        </ExampleContainer>
      </MainContainer>
      <Footer />
    </>
  );
};

export default AskPage;

const ExampleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Example = styled.div`
  width: 50%;
  height: 150px;
  margin: 5px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;

  .question {
    width: 100%;
    text-align: left;
    font-weight: 700;
  }
  .answer {
    width: 100%;
    text-align: left;
    margin-top: 8px;
  }
`;

const InputContainer = styled.form`
  position: relative;
  width: 100%;
  margin-top: 60px;

  input {
    border: 1px solid ${({ theme }) => theme.borderColor01};
    border-radius: 50px;
    padding: 30px 25px;
    font-size: 1.2em;
    padding-left: 60px;

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.5);
    }

    &:focus {
      outline: none;
    }
  }

  .search {
    position: absolute;
    top: 20px;
    left: 22px;
    width: 25px;
    height: 25px;
  }

  .send {
    z-index: 2;
    position: absolute;
    right: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    background: ${({ theme }) => theme.blue01};
    display: flex;
    align-items: center;
    justify-content: center;

    .send_icon {
      color: white;
      width: 20px;
      height: 20px;
    }
  }
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bgColor};
  transition: 3s ease;
  min-height: 130vh;
  padding: 10px;
  padding-bottom: 450px;
  padding-top: 120px;

  .expert {
    margin-top: 10px;
    font-size: 1.5em;
    font-weight: 700;
  }
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
const TopCardContainer = styled.div`
  margin-top: 40px;
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
