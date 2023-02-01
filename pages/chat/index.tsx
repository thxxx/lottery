import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import router from "next/router";
import {
  ChatType,
  QueryType,
  SavedChatType,
  useChatStore,
} from "../../utils/store";
import { dbService } from "../../utils/fbase";
import {
  BottomContainer,
  ChatContainer,
  MainContainer,
  RightContainer,
} from "./style";
import InputWrapper from "../../components/chat/InputWrapper";
import AppBar from "../../components/AppBar";
import BotChat from "./BotChat";
import { DOMAINS, DomainOne } from "../../utils/persona";
import UserChat from "./UserChat";
import axios from "axios";
import _ from "lodash";
import DomainDesc from "./DomainDesc";

const dummy = [
  "'I can create a login page with React by using a <bold>form</bold> component with a username and password <bold>input</bold> field, and a <bold>submit</bold> button to submit the form. An example of the code would look like this:\n\n``` \nimport React, { useState } from 'react';\n\nconst LoginForm = () => {\n const [username, setUsername] = useState('');\n const [password, setPassword] = useState('');\n\n const handleSubmit = (event) => {\n   event.preventDefault();\n   // Logic to authenticate user and log them in\n };\n\n return (\n   <form onSubmit={handleSubmit}>\n     <label>\n       Username:\n       <input\n         type=\"text\"\n         value={username}\n         onChange={(e) => setUsername(e.target.value)}\n       />\n     </label>\n     <br />\n     <label>\n       Password:\n       <input\n         type=\"password\"\n         value={password}\n         onChange={(e) => setPassword(e.target.value)}\n       />\n     </label>\n     <br />\n     <button type=\"submit\">Login</button>\n   </form>\n );\n};\n\nexport default LoginForm;\n```'",
  "Gravity is a fundamental force of nature that exists between any two objects with mass. It governs how objects interact with one another. Mathematically, gravity is described by the equation $F=G \frac{m_1 m_2}{r^2}$, where $F$ is the force of gravity, $G$ is a fundamental constant called the gravitational constant, $m_1$ and $m_2$ are the masses of two objects, and $r$ is the distance between them.",
  "\nLife in the field of agriculture is the interplay of the natural world with human activities. It involves the production of food and fiber from the land, the development of sustainable production systems, and the protection and conservation of natural resources. To achieve this, <bold>there are several practical tips you can follow:</bold> \n\n1. Practice crop rotation to maintain soil fertility and reduce pest problems. \n2. Incorporate cover crops into your rotation to add organic matter and help build soil structure.\n3. Make the most of your resources by using natural fertilizers, such as animal manure and compost.\n4. Use soil testing methods to determine the nutrient needs of your plants. \n5. Employ sustainable practices, such as reducing the use of synthetic pesticides and fertilizers.",
  "Quantum computing is a type of computing that uses the properties of quantum mechanics to perform operations on data. Unlike classical computing, which uses binary digits (bits) that can only have the value of 0 or 1, quantum computing uses quantum bits, or qubits, which can exist in multiple states simultaneously. This allows quantum computers to perform certain types of calculations much faster than classical computers. Applications of quantum computing include cryptography, drug discovery, and financial modeling.",
];

const ChatPage: NextPage = () => {
  const [text, setText] = useState("");
  const [currentChats, setCurrentChats] = useState<SavedChatType[]>();
  const [loading, setLoading] = useState(false);
  const {
    isLoggedIn,
    setIsLoggedIn,
    chats,
    queries,
    job,
    user,
    setChats,
    setQueries,
    setJob,
  } = useChatStore();
  const mainRef = useRef(null);
  let temp = 0;

  useEffect(() => {
    if (temp === 0 && router.query.isFromHome) {
      doSubmit(
        router.query.inputQuery as string,
        router.query.inputOption as any
      );
      router.replace(`/chat?domain=${job}`, undefined, { shallow: true });
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

  const callApi = useCallback(
    async (inputText: string, option: number, addQueries: QueryType[]) => {
      const history = addQueries
        ? [
            ...addQueries
              .filter((item) => item.domain === job)
              .map((item) => item.query),
          ]
        : [];

      const body = {
        query: inputText,
        history: history,
        field: job?.toLowerCase(),
        tag: String(option),
      };

      const response = await axios.post("/davinci", body, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const output = response;
      // const output = await response.json();

      return output.data[0];
      // return dummy[0];
    },
    [queries, job]
  );

  const doSubmit = async (inText: string, option: number) => {
    if (!job) return;
    if (!inText) return;
    if (loading) return;
    setLoading(true);
    setText("");
    const inputText = inText.replaceAll("\n", "<br />");

    let addQueries = queries;
    addQueries.push({ query: inputText, domain: job });
    if (addQueries.length > 4)
      addQueries = addQueries.slice(addQueries.length - 5);
    setQueries([...addQueries]);

    let tempChats = _.cloneDeep(chats);
    tempChats.push(
      {
        text: inputText,
        type: ChatType.USER,
        job: job,
        id: 1,
        createdAt: new Date().getTime(),
      },
      {
        text: "Blah Blah",
        type: ChatType.LOADING,
        job: job,
        id: 2,
        createdAt: new Date().getTime(),
      }
    );
    setChats(tempChats);

    const response = await callApi(inputText, option, addQueries);

    if (isLoggedIn && user) {
      const body: SavedChatType = {
        id: user.uid,
        type: ChatType.BOT,
        query: inputText,
        text: [response],
        createdAt: new Date().getTime(),
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        saved: [],
        job: job,
        webLinks: [],
        asked: "no",
        option: option,
      };

      await dbService
        .collection("chats")
        .add(body)
        .then((docRef) => {
          const addedChats = [
            {
              text: inputText,
              type: ChatType.USER,
              job: job,
              id: chats.length + 1,
              createdAt: new Date().getTime(),
            },
            {
              text: [response],
              type: ChatType.BOT,
              job: job,
              id: docRef.id,
              query: inputText,
              saved: [],
              createdAt: new Date().getTime(),
              option: option,
            },
          ];
          setChats([...chats, ...addedChats]);
          setLoading(false);

          if (!(mainRef.current as any)) return;
          else
            (mainRef.current as any).scrollIntoView({
              behavior: "smooth",
              block: "end",
              inline: "nearest",
            });
        });
    } else {
      // When User did not login.

      const body = {
        // id: user.uid,
        type: ChatType.BOT,
        query: inputText,
        text: [response],
        createdAt: new Date().getTime(),
        // displayName: user.displayName,
        // email: user.email,
        // photoURL: user.photoURL,
        // uid: user.uid,
        saved: [],
        job: job,
        webLinks: [],
        asked: "no",
        option: option,
      };

      await dbService
        .collection("unLoggedInChats")
        .add(body)
        .then((docRef) => {
          const addedChats = [
            {
              text: inputText,
              type: ChatType.USER,
              job: job,
              id: chats.length + 1,
              createdAt: new Date().getTime(),
            },
            {
              text: [response],
              type: ChatType.BOT,
              job: job,
              id: docRef.id,
              query: inputText,
              saved: [],
              createdAt: new Date().getTime(),
              option: option,
            },
          ];
          setChats([...chats, ...addedChats]);
          setLoading(false);
        });
    }
  };

  const generateAnotherAnswer = useCallback(
    async (id: string | number, query: string, option: number) => {
      setLoading(true);
      const response = await callApi(query, option, queries);
      let chosen;
      const filtered = chats.map((item) => {
        if (item.id === id) {
          chosen = item.text;
          return {
            ...item,
            text: [...(item.text as string[]), response],
          };
        } else {
          return item;
        }
      });
      setChats(filtered);

      if (chosen)
        await dbService
          .collection("chats")
          .doc(id as string)
          .update({
            text: [...(chosen as string[]), response],
          });

      setLoading(false);
    },
    [chats, callApi, queries, setChats]
  );

  return (
    <>
      <Head>
        <title>AID Chat</title>
        <meta name="description" content="AID will give you solution" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AppBar page="chat" />
      <MainContainer ref={mainRef}>
        <RightContainer>
          {currentChats && currentChats.length > 0 ? (
            <></>
          ) : (
            <>
              <br />
              <DomainDesc />
            </>
          )}
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
                return (
                  <BotChat
                    key={i}
                    item={{
                      text: [""],
                      type: ChatType.LOADING,
                      questionKey: "string",
                      saved: [],
                      query: "loading", // input of user, only exist when bot.
                      job: job,
                      id: 0,
                    }}
                    loading={true}
                  />
                );
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
