import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import router from "next/router";
import { ChatType, SavedChatType, useChatStore } from "../../utils/store";
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
import { DomainOne } from "../../utils/persona";
import UserChat from "./UserChat";
import axios from "axios";
import _ from "lodash";

const dummy = [
  "'I can create a login page with React by using a <bold>form</bold> component with a username and password <bold>input</bold> field, and a <bold>submit</bold> button to submit the form. An example of the code would look like this:\n\n``` \nimport React, { useState } from 'react';\n\nconst LoginForm = () => {\n const [username, setUsername] = useState('');\n const [password, setPassword] = useState('');\n\n const handleSubmit = (event) => {\n   event.preventDefault();\n   // Logic to authenticate user and log them in\n };\n\n return (\n   <form onSubmit={handleSubmit}>\n     <label>\n       Username:\n       <input\n         type=\"text\"\n         value={username}\n         onChange={(e) => setUsername(e.target.value)}\n       />\n     </label>\n     <br />\n     <label>\n       Password:\n       <input\n         type=\"password\"\n         value={password}\n         onChange={(e) => setPassword(e.target.value)}\n       />\n     </label>\n     <br />\n     <button type=\"submit\">Login</button>\n   </form>\n );\n};\n\nexport default LoginForm;\n```'",
  "Gravity is a fundamental force of nature that exists between any two objects with mass. It governs how objects interact with one another. Mathematically, gravity is described by the equation $F=G \frac{m_1 m_2}{r^2}$, where $F$ is the force of gravity, $G$ is a fundamental constant called the gravitational constant, $m_1$ and $m_2$ are the masses of two objects, and $r$ is the distance between them.",

  "\nLife in the field of agriculture is the interplay of the natural world with human activities. It involves the production of food and fiber from the land, the development of sustainable production systems, and the protection and conservation of natural resources. To achieve this, <bold>there are several practical tips you can follow:</bold> \n\n1. Practice crop rotation to maintain soil fertility and reduce pest problems. \n2. Incorporate cover crops into your rotation to add organic matter and help build soil structure.\n3. Make the most of your resources by using natural fertilizers, such as animal manure and compost.\n4. Use soil testing methods to determine the nutrient needs of your plants. \n5. Employ sustainable practices, such as reducing the use of synthetic pesticides and fertilizers.",

  "Quantum computing is a type of computing that uses the properties of quantum mechanics to perform operations on data. Unlike classical computing, which uses binary digits (bits) that can only have the value of 0 or 1, quantum computing uses quantum bits, or qubits, which can exist in multiple states simultaneously. This allows quantum computers to perform certain types of calculations much faster than classical computers. Applications of quantum computing include cryptography, drug discovery, and financial modeling.",

  "The human brain is an incredibly complex organ that controls all of the body's functions. It is made up of billions of nerve cells, or neurons, which communicate with each other through electrical and chemical signals. The brain can be divided into several different regions, each of which is responsible for different functions. The cerebrum is the largest part of the brain and is responsible for functions such as movement, sensation, and thinking. The cerebellum is located under the cerebrum and is responsible for coordination and balance. The brainstem connects the brain to the spinal cord and is responsible for functions such as breathing and heart rate.",

  "The process of photosynthesis is the way in which plants, algae and some bacteria convert light energy into chemical energy, which they use to produce carbohydrates, such as glucose. This process takes place in the chloroplasts, which are organelles found in the cells of photosynthetic organisms. During photosynthesis, carbon dioxide and water are converted into glucose and oxygen, with the help of chlorophyll, a pigment found in the chloroplasts. The oxygen is released into the atmosphere as a byproduct of photosynthesis, making it a vital process for all life on Earth.",

  "A black hole is an extremely dense region in space where the gravitational pull is so strong that nothing, not even light, can escape. Black holes are formed when massive stars die and their cores collapse under their own gravity. The event horizon is the point of no return for any object that comes too close to a black hole. Beyond this point, the gravitational pull is so strong that nothing can escape, including light. Scientists can detect black holes by observing the effects of their gravity on nearby matter, such as stars and gas.",
];

const ChatPage: NextPage = () => {
  const [text, setText] = useState("");
  const [currentChats, setCurrentChats] = useState<SavedChatType[]>();
  const [loading, setLoading] = useState(false);
  const { chats, queries, job, user, setChats, setQueries, setJob } =
    useChatStore();
  const mainRef = useRef(null);
  let temp = 0;

  useEffect(() => {
    if (temp === 0 && router.query.isFromHome) {
      doSubmit(
        router.query.inputQuery as string,
        router.query.inputOption as any
      );
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

  const callApi = useCallback(
    async (inputText: string, option: number) => {
      const history = queries
        ? [
            ...queries
              .filter((item) => item.domain === job)
              .map((item) => item.query),
          ]
        : [];

      console.log(
        "히스토리 제대로 들어가는지 확인",
        history,
        option,
        option,
        option
      );

      const body = {
        query: inputText,
        history: history,
        field: job?.toLowerCase(),
        tag: String(option),
      };

      // const response = await fetch("/api/call", {
      //   method: "POST",
      //   body: JSON.stringify(body),
      //   headers: { "Content-Type": "application/json" },
      // });

      const response = await axios.post("/davinci", body, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      console.log("응답", response);
      const output = response;
      // const output = await response.json();
      console.log("문제 API 결과", output.data);

      return output.data[0];
      // return dummy[1];
    },
    [queries, job]
  );

  const doSubmit = async (inText: string, option: number) => {
    if (!job) return;
    if (!inText) return;
    setLoading(true);
    setText("");
    const inputText = inText.replaceAll("\n", "<br />");

    let addQueries = queries;
    addQueries.push({ query: inputText, domain: job });

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

    const response = await callApi(inputText, option);

    const body: SavedChatType = {
      id: user?.uid,
      type: ChatType.BOT,
      query: inputText,
      text: [response],
      createdAt: new Date().getTime(),
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      uid: user?.uid,
      saved: [],
      job: job,
      webLinks: [],
      asked: "no",
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
    async (id: string | number, query: string, option: number) => {
      const response = await callApi(query, option);
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
        <title>AID Chat</title>
        <meta name="description" content="AID will give you solution" />
        <link rel="icon" href="/card.png" />
      </Head>
      <AppBar page="chat" />
      <MainContainer ref={mainRef}>
        <RightContainer>
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
