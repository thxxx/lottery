import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Input, Textarea, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ArrowForwardIcon, Search2Icon } from "@chakra-ui/icons";
import router from "next/router";
import { ChatType, useChatStore } from "../../utils/store";
import { dbService } from "../../utils/fbase";
import {
  BotChatWrapper,
  BottomContainer,
  ChatContainer,
  MainContainer,
  RightContainer,
  UserChatWrapper,
} from "./style";
import InputWrapper from "../../components/chat/InputWrapper";
import AppBar from "../../components/AppBar";
import BotChat from "./BotChat";

const ChatPage: NextPage = () => {
  const [text, setText] = useState("");
  const { chats, setChats, user } = useChatStore();

  const callApi = async () => {
    return "tt";
  };

  const doSubmit = async () => {
    setText("");
    const inputText = text.replaceAll("\n", "<br />");

    if (!chats)
      setChats([
        {
          text: inputText,
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
          text: inputText,
          type: ChatType.USER,
        },
        {
          text: "Blah Blah",
          type: ChatType.LOADING,
        },
      ]);
    }

    const response = await callApi();

    const addedChats = [
      ...chats,
      {
        text: inputText,
        type: ChatType.USER,
      },
      {
        text: response,
        type: ChatType.BOT,
      },
    ];

    const body = {
      chats: addedChats,
      createdAt: new Date(),
    };

    setChats(addedChats);
    await dbService.collection("chats").add(body);
  };

  return (
    <>
      <Head>
        <title>Lottery</title>
        <meta name="description" content="Lottery will give you solution" />
        <link rel="icon" href="/card.png" />
      </Head>
      <AppBar page="chat" />
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
                    <div
                      className="text"
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />
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
                return <BotChat key={i} text={item.text} />;
              }
            })}
          </ChatContainer>
          <BottomContainer>
            <InputWrapper onSubmit={doSubmit} text={text} setText={setText} />
          </BottomContainer>
        </RightContainer>
      </MainContainer>
    </>
  );
};

export default ChatPage;
