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

type SavedType = {
  uid: string;
  job: DomainOne;
  savedDate: any;
  query: string;
  responses: string;
  id?: any;
};

const MyPage: NextPage = () => {
  const [radio, setRadio] = useState<string>("found");
  const [saves, setSaves] = useState<SavedType[]>();
  const { user } = useChatStore();

  useEffect(() => {
    // get saved chats 시간순으로
    init();
  }, []);

  const init = async () => {
    await dbService
      .collection("saved")
      .where("uid", "==", user.uid)
      .get()
      .then((res) => {
        const response = res.docs.map((doc) => {
          return { ...(doc.data() as SavedType), id: doc.id };
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
              {saves?.map((item, i) => (
                <div key={i} className="card">
                  <UserChat text={item.query} />
                  <BotChat
                    texts={[item.responses]}
                    saved={true}
                    id={item.id}
                    savedJob={item.job}
                  />
                </div>
              ))}
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
