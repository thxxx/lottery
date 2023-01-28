import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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

export type SavedChatType = {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
  createdAt: Date;
} & ChatInputType;

const ChatPage: NextPage = () => {
  const [text, setText] = useState("");
  const [currentChats, setCurrentChats] = useState<ChatInputType[]>();
  const [loading, setLoading] = useState(false);
  const { chats, job, setChats, user, setJob } = useChatStore();
  const mainRef = useRef(null);
  let temp = 0;

  useEffect(() => {
    if (temp === 0 && router.query.isFromHome) {
      doSubmit(router.query.inputQuery as string);
      router.replace("/chat", undefined, { shallow: true });
      temp = 1;
    }
  }, []);

  useEffect(() => {
    if (job) {
      const filtered = chats.filter((doc) => doc.job === job);
      setCurrentChats(filtered);
    } else {
      const domain = localStorage.getItem("domain");
      setJob(domain as DomainOne);
    }
  }, [chats, job, setJob]);

  const callApi = useCallback(async () => {
    return "tt" + String(chats.length);
  }, [chats]);

  const doSubmit = async (inText: string) => {
    if (!job) return;
    if (!inText) return;
    setLoading(true);
    setText("");
    const inputText = inText.replaceAll("\n", "<br />");

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

    const body: SavedChatType = {
      query: inputText,
      text: [response],
      createdAt: new Date(),
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      uid: user?.uid,
      saved: [],
      job: job,
    };

    await dbService
      .collection("chats")
      .add(body)
      .then((docRef) => {
        console.log(docRef.id);

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
            id: docRef.id,
            query: inputText,
            saved: [],
          },
        ];
        setChats([...chats, ...addedChats]);
        setLoading(false);

        (mainRef.current as any).scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      });
  };

  const generateAnotherAnswer = useCallback(
    async (id: string | number) => {
      console.log("하나 더 추가", id);
      const response = await callApi();
      const filtered = chats.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            text: [...(item.text as string[]), response],
          };
        } else {
          return item;
        }
      });
      setChats(filtered);
    },
    [chats, callApi, setChats]
  );

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
                return (
                  <UserChat
                    key={i}
                    text={item.text as string}
                    displayName={user?.displayName}
                    photoURL={user?.photoURL}
                  />
                );
              } else if (item.type === ChatType.LOADING) {
                return <BotChatWrapper key={i}>...</BotChatWrapper>;
              } else {
                return (
                  <BotChat
                    key={i}
                    item={item}
                    onSubmit={generateAnotherAnswer}
                  />
                );
              }
            })}
          </ChatContainer>
          <BottomContainer>
            <InputWrapper
              onSubmit={doSubmit}
              text={text}
              setText={setText}
              loading={loading}
            />
          </BottomContainer>
        </RightContainer>
      </MainContainer>
    </>
  );
};

export default ChatPage;
