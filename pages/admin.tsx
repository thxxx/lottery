import { Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { dbService } from "../utils/fbase";
import styled from "@emotion/styled";
import { SavedChatType } from "../utils/store";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { dateToText } from "../utils/dateToText";

const DS = [
  "software",
  "agriculture",
  "law",
  "medicine",
  "music",
  "philosophy",
  "business",
  "health",
  "commonsense",
  "history",
  "art",
  "medical",
];

const AdminPage = () => {
  const [password, setPassword] = useState<string>("");
  const [pass, setPass] = useState(false);
  const [chattings, setChattings] = useState<any>();
  const [allChats, setAllChats] = useState<any>();
  const [person, setPerson] = useState("");
  const [domains, setDomains] = useState("");
  const [search, setSearch] = useState(false);

  const passWordCheck = () => {
    console.log(112, password);
    if (password === "123123") {
      console.log(3232);
      setPass(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setSearch(false);

    await dbService
      .collection("chats")
      .orderBy("createdAt", "desc")
      .get()
      .then((res) => {
        const response = res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        });
        setAllChats(response);
        setChattings(response);
      });
  };

  const reset = () => {
    setChattings(allChats);
  };

  const returnDomainQuestions = (domain: string) => {
    return (
      <>
        <div>
          {!search ? (
            <>
              {
                chattings.filter(
                  (doc: SavedChatType) => doc.job.toLocaleLowerCase() === domain
                ).length
              }{" "}
              개
            </>
          ) : (
            <>{chattings.length} 개</>
          )}
        </div>
        <>
          {!search ? (
            <>
              {" "}
              {chattings
                .filter(
                  (doc: SavedChatType) => doc.job.toLocaleLowerCase() === domain
                )
                .map((item: SavedChatType, i: number) => {
                  return (
                    <Tr key={i}>
                      <Td>{item.query}</Td>
                      <Td>{item.displayName}</Td>
                      <Td>{dateToText(item.createdAt)}</Td>
                    </Tr>
                  );
                })}
            </>
          ) : (
            <>
              {" "}
              {chattings.map((item: SavedChatType, i: number) => {
                return (
                  <Tr key={i}>
                    <Td>{item.query}</Td>
                    <Td>{item.displayName}</Td>
                    <Td>{dateToText(item.createdAt)}</Td>
                  </Tr>
                );
              })}
            </>
          )}
        </>
      </>
    );
  };

  const findByName = async () => {
    let modified = [...allChats];
    modified.filter((doc) => doc.displayName === person);

    setChattings(modified);
    setSearch(true);
  };

  return (
    <div>
      {!pass ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            passWordCheck();
          }}>
          <div>비밀번호</div>
          <Input
            value={password}
            onChange={(e: any) => setPassword(e.currentTarget.value)}
          />
        </form>
      ) : (
        <>
          {chattings && (
            <>
              <div>Name</div>
              <Input
                value={person}
                onChange={(e: any) => setPerson(e.currentTarget.value)}
              />
              <Button
                onClick={() => {
                  findByName();
                }}>
                Find by Name
              </Button>
              <Button
                onClick={() => {
                  reset();
                }}>
                Reset
              </Button>
              <div>Domain</div>
              {DS.map((item, i) => {
                return (
                  <DomainButton
                    key={i}
                    onClick={() => {
                      setDomains(item);
                    }}>
                    {item}
                  </DomainButton>
                );
              })}
              <div>Overall number : {chattings.length}</div>
              <Domain>
                <div className="label">{search ? "All searched" : domains}</div>
                <Thead>
                  <Tr>
                    <Th>Query</Th>
                    <Th>Whose</Th>
                    <Th>When</Th>
                  </Tr>
                </Thead>
                <Tbody>{returnDomainQuestions(domains)}</Tbody>
              </Domain>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPage;

const Domain = styled(Table)`
  width: 100%;
  dispaly: flex;
  flex-directoin: column;

  .label {
    font-size: 20px;
    font-weight: 700;
  }
`;

const DomainButton = styled(Button)`
  margin: 4px;
`;
