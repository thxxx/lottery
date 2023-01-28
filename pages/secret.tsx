import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { dbService } from "../utils/fbase";
import { SavedChatType } from "./chat";
import { Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { dateToText } from "../utils/dateToText";

type AskType = SavedChatType & {
  askedAt: any;
};

const AdminPage: NextPage = () => {
  const [asks, setAsks] = useState<AskType[]>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await dbService
      .collection("asked")
      .get()
      .then((res) => {
        const response: any = res.docs.map((doc) => {
          return { ...(doc.data() as SavedChatType), id: doc.id };
        });
        setAsks(response);
      });
  };

  return (
    <div>
      {asks?.map((item) => {
        return (
          <Contents key={item.id}>
            <div>{dateToText(item.askedAt)}</div>
            <div className="answer">Query</div>
            <Heading as="h4" size="md">
              {item.query}
            </Heading>
            <div className="answer">All answerd</div>
            <>
              {(item.text as string[]).map((doc, i) => (
                <div key={i}>
                  {i + 1}) {doc}
                </div>
              ))}
            </>
          </Contents>
        );
      })}
    </div>
  );
};

export default AdminPage;

const Contents = styled.div`
  .answer {
    margin-top: 10px;
  }
  margin: 20px 0px;
`;
