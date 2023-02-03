import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import "swiper/css"; //basic
import styled from "@emotion/styled";
import { EditIcon, RepeatIcon, Search2Icon } from "@chakra-ui/icons";
import { SavedChatType, WebLink, useChatStore } from "../../utils/store";
import { dbService } from "../../utils/fbase";
import IconContainer from "./IconContainer";
import useWindowDimensions from "../../hook/useWindowDimensions";
import { BotChatWrapper } from "./UserChat";
import { Skeleton, useToast } from "@chakra-ui/react";
import TextAnswer from "./TextAnswer";
import ChatSlideInner from "./ChatSlide";
import SwipeNext from "./SwipeNext";
import { Radio } from "../../components/AppBar";
import router from "next/router";
import { DOMAINS } from "../../utils/persona";
import { callApis } from "../../utils/callApi";
import Image from "next/image";
import ToastMessage from "../../components/ToastMessage";
import { LogDataType, LogType, notLogList } from "../../utils/notLoggingList";

const BWIDTH = 150;

type BotChatType = {
  onSubmit?: (id: string | number, query: string, option: number) => void;
  shared?: boolean;
  item: any;
  setSaves?: Dispatch<SetStateAction<SavedChatType[] | undefined>>;
  saves?: SavedChatType[] | undefined;
  savedIndex?: number;
  loading?: boolean;
};

const BotChat = ({
  onSubmit,
  shared,
  item,
  setSaves,
  saves,
  savedIndex,
  loading,
}: BotChatType) => {
  const { user, chats, isLoggedIn, setChats } = useChatStore();
  const [toggle, setToggle] = useState(false);
  const [asked, setAsked] = useState(false);
  const [temps, setTemps] = useState<SavedChatType[]>();
  const [webLoading, setWebLoading] = useState(false);
  const toast = useToast();
  const { width } = useWindowDimensions();

  useEffect(() => {
    setTemps(saves);
  }, []);

  const saveThisChat = async (idx: number) => {
    if (!isLoggedIn) {
      // 로그인 안했으면 금지
      toast({
        description: "You have to login to save your history.",
      });
      return;
    }

    // chats store도 바꿔야하고
    // firebase도 바꿔야함
    const filteredTemp = temps?.filter((doc: any) => doc.id === item.id)[0];
    const isSavedNow =
      (!saves && item.saved && item.saved.includes(idx)) ||
      (saves && filteredTemp?.saved.includes(idx));
    const isNotEmpty =
      (!saves && item.saved.length > 0) ||
      (saves && filteredTemp?.saved.length > 0);

    if (!isSavedNow)
      toast({
        render: () => (
          <ToastMessage>
            You can see it in &nbsp;
            <Image
              src="/myWhite.png"
              width={20}
              height={20}
              alt="mypage"
            />{" "}
            &nbsp; My page.
          </ToastMessage>
        ),
        duration: 3000,
      });

    let modified = {
      ...item,
      saved: [],
    };
    if (isNotEmpty) {
      if (isSavedNow)
        modified.saved = [...item.saved.filter((doc: number) => doc !== idx)];
      else modified.saved = [...item.saved, idx];
    } else {
      modified.saved = [idx];
    }

    if (saves && setSaves) {
      // it means that this is being displayed on MyPage
      const changedChats = temps?.map((doc) =>
        doc.id === item.id ? { ...doc, saved: modified.saved } : { ...doc }
      );
      setTemps(changedChats);
    } else {
      const changedChats = chats.map((doc) =>
        doc.id === item.id ? { ...doc, saved: modified.saved } : { ...doc }
      );
      setChats(changedChats);
    }

    if (isSavedNow) {
      console.log("Delete this conversation");
      updateFirebase(modified);
    } else {
      console.log("Save this conversation");
      updateFirebase(modified);
    }
  };

  const updateFirebase = useCallback(
    async (modified: SavedChatType) => {
      await dbService
        .collection("chats")
        .doc(item.id)
        .update(modified)
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    },
    [item.id]
  );

  const callWebApi = useCallback(async () => {
    const body = {
      query: item.query,
    };

    const response = await fetch("/api/web", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const output = await response.json();

    const ma = output[0].map((doc: any) => {
      return {
        link: doc.url,
        title: doc.title,
        snippet: doc.snippet,
      };
    });

    return ma;
  }, [item.query]);

  const clickWebOpen = useCallback(async () => {
    // 처음에만 호출한다.
    setToggle(true);
    if ((item.webLinks && item.webLinks.length > 0) || webLoading) {
      return;
    }
    setWebLoading(true);
    const response: WebLink[] = await callWebApi();

    // update store
    if (setSaves && saves) {
      const addedSaves = saves.map((doc) => {
        if (doc.id === item.id) return { ...doc, webLinks: response };
        else return doc;
      });
      setSaves(addedSaves);
    } else {
      const addedChats = chats.map((doc) => {
        if (doc.id === item.id) return { ...doc, webLinks: response };
        else return doc;
      });
      setChats(addedChats);
    }

    setWebLoading(false);

    if (!isLoggedIn) return;

    // update db
    const modified = {
      ...item,
      webLinks: response,
    };
    await updateFirebase(modified);

    const uuidd = localStorage.getItem("uuid");
    const body: LogDataType = {
      questionId: modified.id,
      userId: user ? user.uid : uuidd ? uuidd : "notLoggedIn",
      loggedAt: new Date(),
      type: LogType.VIEW,
    };
    if (user && notLogList.includes(user.uid)) return;
    await dbService.collection("log").add(body);

    if (shared) window.location.reload();
  }, [
    chats,
    item,
    updateFirebase,
    setChats,
    setSaves,
    saves,
    callWebApi,
    isLoggedIn,
    shared,
    user,
    webLoading,
  ]);

  const askQuora = async () => {
    if (!isLoggedIn) {
      toast({
        description: "You have to login to ask",
      });
      return;
    }
    setAsked(true);
    const modified = {
      ...item,
      asked: "finding",
    };
    await updateFirebase(modified);
  };

  return (
    <>
      <BotChatWrapper
        w={width}
        spaceBetween={26}
        slidesPerView={1}
        allowTouchMove={width < 1100}
        scrollbar={{ draggable: true }}>
        {item.text.map((tex: string, i: number) => {
          if (savedIndex && savedIndex !== i) {
            return <></>;
          }
          return (
            <CustomSwipeSlide key={i}>
              {onSubmit && i !== 0 && width > 1100 ? (
                <SwipeNext type="prev" />
              ) : (
                <Empty />
              )}
              <ChatSlideInner
                item={item}
                name={
                  <p>
                    {DOMAINS.filter((doc) => doc.domain === item.job)[0].name}{" "}
                    <span>@{item.job?.toLowerCase()}</span>
                  </p>
                }>
                <div className="main bot">
                  {loading ? (
                    <div className="loadings">
                      <Skeleton h={6} />
                      <div style={{ marginTop: "10px" }}></div>
                      <Skeleton h={6} />
                      <div style={{ marginTop: "10px" }}></div>
                      <Skeleton className="loading" h={6} />
                    </div>
                  ) : (
                    <TextAnswer text={tex} />
                  )}
                </div>
                <Bottom>
                  <IconContainer
                    response={tex}
                    saveThisChat={saveThisChat}
                    shared={shared}
                    saved={
                      saves
                        ? temps
                            ?.filter((d: any) => d.id === item.id)[0]
                            .saved.includes(i)
                        : item.saved.includes(i)
                    }
                    index={i}
                    id={item.id}
                    toggle={toggle}
                    setToggle={setToggle}
                    clickWebOpen={clickWebOpen}
                  />
                  <>
                    {toggle && (
                      <>
                        {item.webLinks && item.webLinks.length > 0 ? (
                          <WebContainer>
                            {item.webLinks.map((doc: WebLink, i: number) => (
                              <div
                                className="content"
                                key={i}
                                onClick={() => {
                                  window.open(doc.link);
                                }}>
                                <span className="links">
                                  <span className="domain">
                                    {doc.link
                                      .replace(/https:\/\//g, "")
                                      .replace(/\/.*/, "")}
                                  </span>
                                </span>
                                <p className="title">{doc.title}</p>
                                {/* <span>{doc.snippet}</span> */}
                              </div>
                            ))}
                          </WebContainer>
                        ) : (
                          <>
                            <Skeleton width="95%" height={8} mt={4} />
                            <Skeleton width="95%" height={8} mt={3} />
                            <Skeleton width="95%" height={8} mt={3} />
                          </>
                        )}
                      </>
                    )}
                  </>
                </Bottom>
              </ChatSlideInner>
              {width < 1100 && onSubmit && (
                <SwipeNoti>
                  &nbsp; {">>"} &nbsp; swipe to get another response
                </SwipeNoti>
              )}
              {onSubmit && width > 1100 ? <SwipeNext type="next" /> : <Empty />}
            </CustomSwipeSlide>
          );
        })}
        {onSubmit && (
          <CustomSwipeSlide>
            {width > 1100 && <SwipeNext type="prev" />}
            <ChatSlideInner
              item={item}
              name={
                <p>
                  {DOMAINS.filter((doc) => doc.domain === item.job)[0].name}{" "}
                  <span>@{item.job?.toLowerCase()}</span>
                </p>
              }>
              {asked || item.asked ? (
                <QuoraDid className="main">
                  <p>
                    We will find the answer as soon as possible and let you know
                    by notification.
                  </p>
                  <p>
                    You can see answer in
                    <Radio
                      onClick={() => {
                        router.push({
                          pathname: "/my",
                        });
                      }}
                      clicked={false}>
                      My Page
                    </Radio>
                    It will takes about 1 hour.
                  </p>
                </QuoraDid>
              ) : (
                <div className="agains">
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100px",
                      }}>
                      <Skeleton h={6} width="95%" />
                      <div style={{ marginTop: "10px" }}></div>
                      <Skeleton h={6} width="95%" />
                      <div style={{ marginTop: "10px" }}></div>
                      <Skeleton className="loading" width="95%" h={6} />
                    </div>
                  ) : (
                    <>
                      <SelectionBtn
                        left={true}
                        onClick={() =>
                          onSubmit(item.id, item.query, item.option)
                        }>
                        <RepeatIcon
                          color="blackAlpha.600"
                          width={25}
                          height={25}
                        />
                        <p>
                          Do you want me to
                          <br />
                          answer it again?
                        </p>
                      </SelectionBtn>
                      <SelectionBtn left={true} onClick={() => askQuora()}>
                        <Search2Icon
                          color="blackAlpha.600"
                          width={25}
                          height={25}
                        />
                        <p>Get answer from human expert (takes 1 hour)</p>
                      </SelectionBtn>
                    </>
                  )}
                </div>
              )}
            </ChatSlideInner>
            <Empty />
          </CustomSwipeSlide>
        )}
      </BotChatWrapper>
    </>
  );
};

export default React.memo(BotChat);

const SwipeNoti = styled.div`
  color: #cfcfcf;
  margin: 3px 0px;
  padding: 4px 0px;
  padding-left: 4%;
  // border-top: 1px solid #cfcfcf;
  // border-bottom: 1px solid #cfcfcf;
  width: 100%;
`;

const WebContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: start;
  width: 100%;
  padding: 0px 2px;
  padding-bottom: 5px;

  .content {
    padding: 5px 5px;
    cursor: pointer;
    width: 100%;
    margin-top: 7px;
    // background: ${({ theme }) => theme.grey + "44"};
    // border-radius: 8px;

    .title {
      transition: 0.2s ease;
    }

    &:hover {
      .title {
        color: ${({ theme }) => theme.blue01};
      }
    }

    p {
      margin-top: 4px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .domain {
    }

    .links {
      // border: 1px solid rgba(0, 0, 0, 0.07);
      // border-radius: 50px;
      // padding: 2px 10px;
      // margin-left: -3px;
    }
  }

  @media (max-width: 1100px) {
    font-size: 0.9em;
    .content {
      p {
        margin-top: 4px;
      }
    }
  }
`;

const SelectionBtn = styled.div<{ left: boolean }>`
  width: 45%;
  min-height: 120px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0px 25px;
  font-weight: 700;
  color: ${({ theme, left }) => (left ? theme.black06 : "white")};

  padding: 20px;
  border-radius: 10px;
  cursor: pointer;

  background-color: ${({ theme, left }) =>
    left ? theme.bgColor03 : theme.blue02};

  p {
    margin-top: 10px;
    line-height: 1.4em;
  }

  &:hover {
    background: ${({ theme }) => theme.bgColor04};
  }

  @media (max-width: 1100px) {
    width: 95%;
    margin: 0px 3px;
    padding: 5px;
    height: 50px;
    font-size: 0.9em;
  }
`;

export const CustomSwipeSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Empty = styled.div`
  width: ${BWIDTH}px;
`;

export const Bottom = styled.div`
  margin-top: 25px;
  width: 100%;
  background: ${({ theme }) => theme.grey + "44"};
  padding: 5px 5px;
  border-radius: 8px;
`;

const QuoraDid = styled.div`
  width: 97%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-weight: 700;
  line-height: 1.8em;

  padding: 30px 10px;
  border-radius: 10px;

  background-color: ${({ theme }) => theme.bgColor03};
  color: ${({ theme }) => theme.black06};

  @media (max-width: 800px) {
    width: 90%;
  }
`;
