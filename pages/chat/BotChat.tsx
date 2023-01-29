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
import { RepeatIcon } from "@chakra-ui/icons";
import { SavedChatType, WebLink, useChatStore } from "../../utils/store";
import { dbService } from "../../utils/fbase";
import IconContainer from "./IconContainer";
import useWindowDimensions from "../../hook/useWindowDimensions";
import { BotChatWrapper } from "./UserChat";
import { Skeleton } from "@chakra-ui/react";
import TextAnswer from "./TextAnswer";
import ChatSlideInner from "./ChatSlide";
import SwipeNext from "./SwipeNext";

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
  const { user, job, chats, setChats } = useChatStore();
  const [toggle, setToggle] = useState(false);
  const [asked, setAsked] = useState(false);
  const [temps, setTemps] = useState<SavedChatType[]>();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setTemps(saves);
  }, []);

  const saveThisChat = async (idx: number) => {
    // chats store도 바꿔야하고
    // firebase도 바꿔야함
    const filteredTemp = temps?.filter((doc: any) => doc.id === item.id)[0];
    const isSavedNow =
      (!saves && item.saved && item.saved.includes(idx)) ||
      (saves && filteredTemp?.saved.includes(idx));
    const isNotEmpty =
      (!saves && item.saved.length > 0) ||
      (saves && filteredTemp?.saved.length > 0);

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

  const callWebApi = async () => {
    // const body = {
    //   query: inputText,
    // };

    // const response = await fetch("/api/web", {
    //   method: "POST",
    //   body: JSON.stringify(body),
    //   headers: { "Content-Type": "application/json" },
    // });
    // const output = await response.json();
    // console.log(output, "응답ㅎ ㅘㄱ인", output[0]);

    return [
      {
        link: "google.com",
        title: "where is gravity?",
      },
      {
        link: "google.com",
        title: "where is gravity?",
      },
      {
        link: "google.com",
        title: "where is gravity?",
      },
    ];
  };

  const clickWebOpen = useCallback(async () => {
    // 처음에만 호출한다.
    console.log("클릭 웹 오픈", item);
    if (item.webLinks) {
      setToggle(true);
      return;
    }

    const response: WebLink[] = await callWebApi();

    // update store
    const addedChats = chats.map((doc) => {
      if (doc.id === item.id) return { ...doc, webLinks: response };
      else return doc;
    });
    setChats(addedChats);

    // update db
    const modified = {
      ...item,
      webLinks: response,
    };
    await updateFirebase(modified);

    setToggle(true);
  }, [chats, item, updateFirebase, setChats]);

  const askQuora = async () => {
    setAsked(true);
    // 다른 DB에 저장되어야겠지??
    // const body = { ...item, askedAt: new Date().getTime() };
    // await dbService.collection("asked").add(body);

    const modified = {
      ...item,
      asked: true,
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
              <ChatSlideInner item={item}>
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
                <IconContainer
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
                  {toggle && item.webLinks && (
                    <WebContainer>
                      {item.webLinks.map((doc: WebLink, i: number) => (
                        <div
                          className="content"
                          key={i}
                          onClick={() => {
                            window.open(doc.link);
                          }}>
                          <span className="links">
                            <span className="favicon">f</span>
                            <span className="domain">{doc.link}</span>
                          </span>
                          <p className="title">{doc.title}</p>
                        </div>
                      ))}
                    </WebContainer>
                  )}
                </>
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
            <ChatSlideInner item={item}>
              {asked ? (
                <>
                  We will find the answer as soon as possible and let you know
                  by notification.
                </>
              ) : (
                <div className="agains">
                  <SelectionBtn
                    left={true}
                    onClick={() => onSubmit(item.id, item.query, item.option)}>
                    <RepeatIcon color="blackAlpha.600" width={25} height={25} />
                    <p className="again">
                      Do you want me to
                      <br />
                      answer it again?
                    </p>
                  </SelectionBtn>
                  <SelectionBtn left={false} onClick={() => askQuora()}>
                    <RepeatIcon color="white" width={25} height={25} />
                    <p>Get Answer from Quora</p>
                  </SelectionBtn>
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

  .content {
    padding: 7px 0px;
    cursor: pointer;
    width: 100%;
    .title {
      transition: 0.2s ease;
    }

    &:hover {
      .title {
        color: ${({ theme }) => theme.blue01};
      }
    }

    p {
      margin-top: 7px;
      font-weight: 700;
    }
    .domain {
      margin-left: 5px;
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
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0px 25px;
  color: white;
  font-weight: 700;

  padding: 20px;
  border-radius: 10px;
  cursor: pointer;

  background-color: ${({ theme, left }) =>
    left ? theme.bgColor03 : theme.blue02};

  p {
    margin-top: 5px;
  }

  @media (max-width: 1100px) {
    width: 95%;
    margin: 5px 0px;
    padding: 5px;
    height: 50px;
    p {
      margin-top: 1px;
    }
  }
`;

export const CustomSwipeSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  .innerd {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 100%;
    width: 100%;
    max-width: 750px;
  }

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Empty = styled.div`
  width: ${BWIDTH}px;
`;
