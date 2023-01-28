import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react"; // basic
import "swiper/css"; //basic
import styled from "@emotion/styled";
import { ArrowLeftIcon, ArrowRightIcon, RepeatIcon } from "@chakra-ui/icons";
import { useSwiper } from "swiper/react";
import { ChatInputType, useChatStore } from "../../utils/store";
import { dbService } from "../../utils/fbase";
import { DOMAINS, DomainOne } from "../../utils/persona";
import NameByDomain from "../../components/NameByDomain";
import IconContainer from "./IconContainer";
import { SavedChatType } from ".";
import useWindowDimensions from "../../hook/useWindowDimensions";

const dummy = [
  {
    favicon: "favicon",
    domain: "google.com",
    title: "Title of this website",
  },
  {
    favicon: "favicon",
    domain: "google.com",
    title: "Title of this website",
  },
  {
    favicon: "favicon",
    domain: "google.com",
    title: "Title of this website",
  },
];

type BotChatType = {
  onSubmit?: (id: string | number) => void;
  shared?: boolean;
  item: any;
  setSaves?: Dispatch<SetStateAction<SavedChatType[] | undefined>>;
  saves?: SavedChatType[] | undefined;
  savedIndex?: number;
};

const BotChat = ({
  onSubmit,
  shared,
  item,
  setSaves,
  saves,
  savedIndex,
}: BotChatType) => {
  const { user, job, chats, setChats } = useChatStore();
  const [toggle, setToggle] = useState(false);
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

  const updateFirebase = async (modified: SavedChatType) => {
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
  };

  return (
    <>
      <BotChatWrapper
        spaceBetween={26}
        slidesPerView={1}
        allowTouchMove={width < 800}
        scrollbar={{ draggable: true }}>
        {item.text.map((tex: string, i: number) => {
          if (savedIndex && savedIndex !== i) {
            return <></>;
          }
          return (
            <CustomSwipeSlide key={i}>
              {onSubmit && i !== 0 && width > 800 ? (
                <SwipeNext type="prev" />
              ) : (
                <Empty />
              )}
              <div className="innerd">
                <div className="profile">
                  <span className="img">
                    <p>전</p>
                  </span>
                </div>
                <div className="text">
                  <NameByDomain domain={item.job} />
                  <p className="main">{tex}</p>
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
                  />
                  <>
                    {toggle && (
                      <WebContainer>
                        {dummy.map((doc, i) => (
                          <div className="content" key={i}>
                            <div>
                              <span className="favicon">{doc.favicon}</span>
                              <span className="domain">{doc.domain}</span>
                            </div>
                            <p className="title">{doc.title}</p>
                          </div>
                        ))}
                      </WebContainer>
                    )}
                  </>
                </div>
              </div>
              {width < 800 && (
                <SwipeNoti>
                  &nbsp; {">>"} &nbsp; swipe to get another response
                </SwipeNoti>
              )}
              {onSubmit && width > 800 ? <SwipeNext type="next" /> : <Empty />}
            </CustomSwipeSlide>
          );
        })}
        {onSubmit && (
          <CustomSwipeSlide>
            {width > 800 && <SwipeNext type="prev" />}
            <div className="innerd">
              <div className="profile">
                <span className="img">
                  <p>전</p>
                </span>
              </div>
              <div className="text">
                <NameByDomain domain={item.job} />
                <div className="agains">
                  <SelectionBtn left={true} onClick={() => onSubmit(item.id)}>
                    <RepeatIcon color="white" width={25} height={25} />
                    <p>
                      Do you want me to
                      <br />
                      answer it again?
                    </p>
                  </SelectionBtn>
                  <SelectionBtn left={false}>
                    <RepeatIcon color="white" width={25} height={25} />
                    <p>Get Answer from Quora</p>
                  </SelectionBtn>
                </div>
              </div>
            </div>
            <Empty />
          </CustomSwipeSlide>
        )}
      </BotChatWrapper>
    </>
  );
};

export default React.memo(BotChat);

const SwipeNext = ({ type }: { type: "prev" | "next" }) => {
  const swiper = useSwiper();

  return (
    <SwipeDiv
      onClick={() => {
        type === "prev" && swiper.slidePrev();
        type === "next" && swiper.slideNext();
      }}>
      {type === "next" && (
        <>
          <ArrowRightIcon />
          <p>click to get another response</p>
        </>
      )}
      {type === "prev" && <ArrowLeftIcon />}
    </SwipeDiv>
  );
};

const SwipeDiv = styled.div`
  cursor: pointer;
  background: rgba(0, 0, 0, 0.05);
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background: red;
  }
`;

const SwipeNoti = styled.div`
  color: #cfcfcf;
  margin: 3px 0px;
  padding: 4px 0px;
  // border-top: 1px solid #cfcfcf;
  // border-bottom: 1px solid #cfcfcf;
  width: 100%;
`;

const WebContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .content {
    padding: 10px 0px;
    p {
      margin-top: 7px;
      font-weight: 700;
    }
    .domain {
      margin-left: 5px;
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

  @media (max-width: 800px) {
    width: 95%;
    margin: 5px 0px;
    padding: 5px;
    height: 50px;
    p {
      margin-top: 1px;
    }
  }
`;

const CustomSwipeSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  .innerd {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const BotChatWrapper = styled(Swiper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  // border-bottom: 1px solid ${({ theme }) => theme.borderColor01};
  padding: 0px 15px;
  padding-top: 25px;
  padding-bottom: 5px;
  background: ${({ theme }) => theme.blue01 + "01"};

  width: 1200px;
  left: -200px;

  .profile {
    width: 64px;
  }

  .text {
    width: 736px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    .name {
      font-weight: 700;
      span {
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
        font-size: 1em;
        margin-left: 4px;
      }
    }

    .main {
      margin-top: 15px;
    }

    .agains {
      width: 100%;
      margin-top: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
  .img {
    border-radius: 300px;
    background: brown;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 35px;
    height: 35px;
    color: white;
  }

  @media (max-width: 800px) {
    padding: 10px 10px;

    .profile {
      width: 12%;
    }
    .text {
      width: 88%;
      .main {
        margin-top: 5px;
      }

      .agains {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
    .img {
      width: 30px;
      height: 30px;
    }
  }
`;

const Empty = styled.div`
  width: 200px;
`;
