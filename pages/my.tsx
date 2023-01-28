import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { MainContainer } from "./chat/style";
import { dbService } from "../utils/fbase";
import { useChatStore } from "../utils/store";
import styled from "@emotion/styled";
import BotChat from "./chat/BotChat";
import { DomainOne } from "../utils/persona";
import UserChat from "./chat/UserChat";
import { SavedChatType } from "./chat";
import { Button } from "@chakra-ui/react";

const MyPage: NextPage = () => {
  const [radio, setRadio] = useState<"found" | "saved">("found");
  const [saves, setSaves] = useState<SavedChatType[]>();
  const [asks, setAsks] = useState<any>();
  const [pagi, setPagi] = useState<number>(1);
  const [readed, setReaded] = useState<string[]>([]);
  const { user } = useChatStore();

  useEffect(() => {
    // get saved chats 시간순으로
    setPagi(1);
    init();
    const readIds = localStorage.getItem("read");
    if (readIds) {
      setReaded(JSON.parse(readIds));
      console.log("리드 아이디으", JSON.parse(readIds));
    }
  }, []);

  const init = async () => {
    await dbService
      .collection("chats")
      .where("uid", "==", user?.uid)
      .where("saved", "array-contains-any", [0, 1, 2, 3, 4, 5, 6, 7, 8])
      .orderBy("createdAt")
      .startAfter(pagi)
      .limit(3)
      .get()
      .then((res) => {
        const response = res.docs.map((doc) => {
          return { ...(doc.data() as SavedChatType), id: doc.id };
        });
        if (saves) setSaves([...saves, ...response]);
        else setSaves(response);

        if (response.length < 3) setPagi(0);
        else setPagi(response.slice(-1)[0].createdAt);
      });
    await dbService
      .collection("chats")
      .where("uid", "==", user?.uid)
      .where("asked", "==", true)
      .get()
      .then((res) => {
        const response = res.docs.map((doc) => {
          return { ...(doc.data() as SavedChatType), id: doc.id };
        });
        console.log(JSON.stringify(response.map((item) => item.id)));
        localStorage.setItem(
          "read",
          JSON.stringify(response.map((item) => item.id))
        );
        setAsks(response);
      });
  };

  return (
    <>
      <AppBar page="my" radio={radio} onClick={setRadio} />
      <MainContainer>
        <MyPageConainer>
          {radio === "saved" && (
            <SavedContainer>
              {saves?.map((item, i) => {
                return (
                  <>
                    {item.saved.map((doc: number) => {
                      return (
                        <SavedContent key={`key_${i}${doc}`} className="card">
                          <UserChat
                            text={item.query as string}
                            displayName={item.displayName}
                            photoURL={item.photoURL}
                          />
                          <BotChat
                            item={item}
                            savedIndex={doc}
                            saves={saves}
                            setSaves={setSaves}
                          />
                        </SavedContent>
                      );
                    })}
                  </>
                );
              })}
              {pagi !== 0 && <Button onClick={() => init()}>Load more</Button>}
            </SavedContainer>
          )}
          {radio === "found" && (
            <SavedContainer>
              <div>Recent</div>
              {asks?.map((item, i) => {
                return (
                  <>
                    <SavedContent
                      key={`key_${i}`}
                      className="card"
                      isNew={!readed.includes(item.id as string)}>
                      <UserChat
                        text={item.query as string}
                        displayName={item.displayName}
                        photoURL={item.photoURL}
                      />
                      <BotChat item={item} saves={asks} setSaves={setAsks} />
                    </SavedContent>
                  </>
                );
              })}
            </SavedContainer>
          )}
        </MyPageConainer>
      </MainContainer>
    </>
  );
};

export default MyPage;

const MyPageConainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SavedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SavedContent = styled.div<{ isNew?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${({ theme, isNew }) => (isNew ? theme.blue02 : "white")};
  border-left: 1px solid ${({ theme }) => theme.bgColor03};
  border-right: 1px solid ${({ theme }) => theme.bgColor03};
  border-bottom: 1px solid ${({ theme }) => theme.bgColor03};

  // border-radius: 8px;
  // border: 1px solid black;
  // margin-top: 10px;
`;
