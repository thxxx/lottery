import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Input, Textarea, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ArrowForwardIcon, Search2Icon } from "@chakra-ui/icons";
import router from "next/router";
import { ChatInputType, ChatType, useChatStore } from "../../utils/store";
import { dbService } from "../../utils/fbase";
import {
  BotChatWrapper,
  BottomContainer,
  ChatContainer,
  MainContainer,
  RightContainer,
} from "./style";
import InputWrapper from "../../components/chat/InputWrapper";
import AppBar from "../../components/AppBar";
import BotChat from "./BotChat";
import { DomainOne } from "../../utils/persona";
import UserChat from "./UserChat";

const ChatPage: NextPage = () => {
  const [text, setText] = useState("");
  const { chats, job, setChats, user, setJob } = useChatStore();
  const [currentChats, setCurrentChats] = useState<ChatInputType[]>();
  const mainRef = useRef(null);

  useEffect(() => {
    if (job) {
      const filtered = chats.filter((doc) => doc.job === job);
      setCurrentChats(filtered);
    } else {
      const domain = localStorage.getItem("domain");
      setJob(domain as DomainOne);
    }
  }, [chats, job, setJob]);

  const callApi = async () => {
    return "tt" + String(chats.length);
  };

  const doSubmit = async () => {
    if (!job) return;
    if (!text) return;
    setText("");
    const inputText = text.replaceAll("\n", "<br />");

    if (!chats)
      setChats([
        {
          text: inputText,
          type: ChatType.USER,
          job: job,
          id: 1,
        },
        {
          text: "Blah Blah",
          type: ChatType.LOADING,
          job: job,
          id: 2,
        },
      ]);
    else {
      setChats([
        ...chats,
        {
          text: inputText,
          type: ChatType.USER,
          job: job,
          id: chats.length + 1,
        },
        {
          text: "Blah Blah",
          type: ChatType.LOADING,
          job: job,
          id: chats.length + 2,
        },
      ]);
    }

    const response = await callApi();

    const addedChats = [
      {
        text: inputText,
        type: ChatType.USER,
        job: job,
        id: chats.length + 1,
      },
      {
        text: [response],
        type: ChatType.BOT,
        job: job,
        id: chats.length + 2,
      },
    ];

    const allChats = [...chats, ...addedChats];

    setChats(allChats);

    const body = {
      query: inputText,
      chats: [response],
      createdAt: new Date(),
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      uid: user.uid,
    };
    // await dbService.collection("chats").add(body);

    (mainRef.current as any).scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const generateAnotherAnswer = () => {};

  return (
    <>
      <Head>
        <title>Lottery</title>
        <meta name="description" content="Lottery will give you solution" />
        <link rel="icon" href="/card.png" />
      </Head>
      <AppBar page="chat" />
      <MainContainer ref={mainRef}>
        <RightContainer>
          <p>{job}</p>
          <ChatContainer>
            {currentChats?.map((item, i) => {
              if (item.type === ChatType.USER) {
                return <UserChat key={i} text={item.text as string} />;
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
                  <BotChat
                    key={i}
                    texts={item.text as string[]}
                    onSubmit={doSubmit}
                    id={item.id}
                    saved={item.saved}
                  />
                );
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
