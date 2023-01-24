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
import { ChatType, useChatStore } from "../utils/store";

const ChatPage: NextPage = () => {
  const [text, setText] = useState("");
  const { chats, setChats, user } = useChatStore();

  const doSubmit = () => {
    if (!chats)
      setChats([
        {
          text: text,
          type: ChatType.USER,
        },
        {
          text: "Blah Blah",
          type: ChatType.LOADING,
        },
      ]);
    else {
      setChats([
        ...chats,
        {
          text: text,
          type: ChatType.USER,
        },
        {
          text: "Blah Blah",
          type: ChatType.LOADING,
        },
      ]);
    }
  };

  return (
    <>
      <Head>
        <title>Lottery</title>
        <meta name="description" content="Lottery will give you solution" />
        <link rel="icon" href="/card.png" />
      </Head>
      <MainContainer>
        <RightContainer>
          <ChatContainer>
            {chats.map((item, i) => {
              if (item.type === ChatType.USER) {
                return (
                  <UserChatWrapper key={i}>
                    <div className="profile">
                      {/* <Image
                        width={20}
                        height={20}
                        alt="img"
                        className="img"
                        src={user?.photoURL as string}> */}
                      호진
                      {/* </Image> */}
                    </div>
                    <div className="text">{item.text}</div>
                  </UserChatWrapper>
                );
              } else if (item.type === ChatType.LOADING) {
                return (
                  <BotChatWrapper key={i}>
                    <div className="profile">
                      <span className="img">전문가</span>
                    </div>
                    <div className="text">
                      <Image
                        src="/loading.gif"
                        width={50}
                        height={40}
                        alt="loading"
                      />
                    </div>
                  </BotChatWrapper>
                );
              } else {
                return (
                  <BotChatWrapper key={i}>
                    <div className="profile">
                      <span className="img">전문가</span>
                    </div>
                    <div className="text">{item.text}</div>
                  </BotChatWrapper>
                );
              }
            })}
          </ChatContainer>
          <BottomContainer>
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
              <span
                className="send"
                onClick={() => {
                  doSubmit();
                }}>
                <ArrowForwardIcon className="send_icon" color="white" />
              </span>
            </InputContainer>
          </BottomContainer>
        </RightContainer>
      </MainContainer>
    </>
  );
};

export default ChatPage;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: blue;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px 0px;
`;

const ChatContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const BottomContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.bgColor02};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const InputContainer = styled.form`
  position: relative;
  width: 95%;

  input {
    border: 1px solid ${({ theme }) => theme.borderColor01};
    border-radius: 8px;
    padding: 20px 13px;
    padding-left: 35px;
    font-size: 1em;

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.5);
    }

    &:focus {
      outline: none;
    }
  }

  .search {
    position: absolute;
    top: 13px;
    left: 10px;
    width: 18px;
    height: 18px;
  }

  .send {
    z-index: 2;
    position: absolute;
    right: 7px;
    top: 6px;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background: ${({ theme }) => theme.blue01};
    display: flex;
    align-items: center;
    justify-content: center;

    .send_icon {
      color: white;
      width: 15px;
      height: 15px;
    }
  }
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bgColor};
  height: 100vh;
  padding-top: 50px;
`;

const UserChatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  aligm-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor01};
  padding: 25px 15px;

  .profile {
    width: 10%;
  }
  .text {
    width: 90%;
  }

  .img {
    border-radius: 3px;
    background: brown;
    display: flex;
    flex-direction: row;
    aligm-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
  }
`;
const BotChatWrapper = styled(UserChatWrapper)`
  background: ${({ theme }) => theme.blue01 + "22"};
`;
