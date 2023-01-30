import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { dbService } from "../../utils/fbase";
import { MainContainer } from "../chat/style";
import UserChat from "../chat/UserChat";
import BotChat from "../chat/BotChat";
import styled from "@emotion/styled";
import AppBar from "../../components/AppBar";
import Head from "next/head";
import { SavedChatType } from "../../utils/store";

const SharePage = () => {
  const router = useRouter();
  const { id, saved } = router.query;
  const [data, setData] = useState<SavedChatType>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (id && typeof id === "string") {
      const rr = await dbService
        .collection("chats")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const res = doc.data();
            setData(res as any);
          } else {
            console.log("No such document!");
          }
        });
    }
  };

  return (
    <>
      {data && (
        <>
          <Head>
            <title>{data ? data.query : "Shared Content if AID"}</title>
            <meta name="description" content="Shared Content from AID" />
            <link rel="icon" href="/card.png" />
          </Head>
          <AppBar page="share" />
          <MainContainer>
            <SharedContainer>
              {data && data.query && saved && (
                <OneChat>
                  <UserChat
                    text={data.query as string}
                    displayName={data.displayName}
                    photoURL={data.photoURL}
                  />
                  <BotChat
                    savedIndex={parseInt(saved as string)}
                    item={data}
                    shared
                  />
                </OneChat>
              )}
            </SharedContainer>
          </MainContainer>
        </>
      )}
    </>
  );
};

export default SharePage;

const OneChat = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SharedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
