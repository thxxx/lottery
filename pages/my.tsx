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

const MyPage: NextPage = () => {
  const [radio, setRadio] = useState<string>("found");
  const [saves, setSaves] = useState<SavedChatType[]>();
  const { user } = useChatStore();

  useEffect(() => {
    // get saved chats 시간순으로
    init();
  }, [radio]);

  const init = async () => {
    await dbService
      .collection("chats")
      .where("uid", "==", user?.uid)
      .where("saved", "array-contains-any", [0, 1, 2, 3, 4, 5, 6, 7, 8])
      // .orderBy("createdAt")
      .get()
      .then((res) => {
        const response = res.docs.map((doc) => {
          return { ...(doc.data() as SavedChatType), id: doc.id };
        });
        setSaves(response);
      });
  };

  return (
    <>
      <AppBar page="my" radio={radio} onClick={setRadio} />
      <MainContainer>
        <MyPageConainer>
          <div>{radio}</div>
          {radio === "saved" && (
            <SavedContainer>
              {saves?.map((item, i) => {
                return (
                  <>
                    {item.saved.map((doc: number) => {
                      return (
                        <div key={`key_${i}${doc}`} className="card">
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
                        </div>
                      );
                    })}
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

  .card {
    width: 100%;
  }
`;
