import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { dbService } from "../utils/fbase";
import { Button, Heading, Input, Textarea } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { SavedChatType } from "../utils/store";
import _ from "lodash";

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
      .collection("chats")
      .where("asked", "==", "finding")
      .get()
      .then((res) => {
        const response: any = res.docs.map((doc) => {
          return { ...(doc.data() as SavedChatType), id: doc.id };
        });
        setAsks(response);
      });
  };

  const submit = async (text: string, item: AskType) => {
    console.log("제출", text, item);

    let ms = _.cloneDeep(item.saved);
    ms.push(item.saved.length + 1);
    let mt = _.cloneDeep(item.text as string[]);
    mt.push(text);

    const body = {
      ...item,
      asked: "found",
      saved: ms,
      text: mt,
    };

    await dbService
      .collection("chats")
      .doc(item.id as string)
      .update(body)
      .then((res) => {
        console.log("결과 출력", res);
      });

    if (asks) {
      setAsks(
        asks.map((doc) => {
          if (doc.id === item.id) return { ...doc, asked: "found" };
          else return { ...doc };
        })
      );
    }
  };

  return (
    <div>
      {asks?.map((item) => {
        return (
          <Contents key={item.id}>
            {/* <div>{dateToText(new Date(item.askedAt))}</div> */}
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(e.target[0].value, item);
              }}>
              <Input disabled={item.asked !== "finding"} rows={3} />
            </form>
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
