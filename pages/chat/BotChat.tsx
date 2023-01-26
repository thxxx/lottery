import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react"; // basic
import "swiper/css"; //basic
import styled from "@emotion/styled";
import IconButton from "../../components/IconButton";
import { ArrowLeftIcon, HamburgerIcon, SunIcon } from "@chakra-ui/icons";
import { useSwiper } from "swiper/react";
import { useChatStore } from "../../utils/store";
import { dbService } from "../../utils/fbase";
import { useToast } from "@chakra-ui/react";
import { DOMAINS } from "../../utils/persona";

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
  texts: string[];
  onSubmit: () => void;
  id: string | number;
  saved: boolean | undefined;
};

const BotChat = ({ texts, onSubmit, id, saved }: BotChatType) => {
  const { user, job, chats, setChats } = useChatStore();
  const toast = useToast();
  const [toggle, setToggle] = useState(false);

  const saveThisChat = async (idx: number) => {
    // chats store도 바꿔야하고
    // firebase도 바꿔야함
    const ff = chats.map((doc) => {
      if (doc.id === id) {
        return {
          ...doc,
          saved: !doc.saved,
        };
      } else {
        return doc;
      }
    });
    setChats(ff);

    // save or delete

    const query = chats.filter(
      (doc) => doc.id === id || doc.id === (id as number) - 1
    );

    if (!query) return;
    if (query.length < 2) return;

    if (query[1].saved === true) {
      console.log("얘는 지워야함");
      // 찾아서 삭제
      const fo = await dbService
        .collection("saved")
        .where("uid", "==", user.uid)
        .where("job", "==", job)
        .where("responses", "==", query[1].text[idx])
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log("데이터를 삭제");
            doc.ref.delete();
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    } else {
      console.log("저장");

      const body = {
        uid: user.uid,
        job: job,
        savedDate: new Date(),
        query: query[0].text,
        responses: query[1].text[idx],
      };

      await dbService.collection("saved").add(body);
    }
  };

  return (
    <BotChatWrapper
      spaceBetween={16}
      slidesPerView={1}
      scrollbar={{ draggable: true }}>
      {texts.map((item, i) => {
        return (
          <CustomSwipeSlide key={i}>
            {i !== 0 && <SwipeNext type="prev" />}
            <div className="profile">
              <span className="img">전</span>
            </div>
            <div className="text">
              <p className="name">
                {DOMAINS.filter((doc) => doc.domain === job)[0].name}{" "}
                <span>@{job?.toLowerCase()}</span>
              </p>
              <p className="main">{item}</p>
              <IconContainer>
                <div>
                  <IconButton
                    icon={
                      <SunIcon color={saved ? "red.400" : "blackAlpha.300"} />
                    }
                    tooltip="Save"
                    onClick={() => {
                      saveThisChat(i);
                    }}
                  />
                  <IconButton
                    icon={<SunIcon />}
                    tooltip="Share"
                    onClick={() => {
                      toast({
                        description: "Copied to Clipboard",
                      });
                    }}
                  />
                </div>
                <div>
                  {toggle ? (
                    <IconButton
                      icon={
                        <ArrowLeftIcon style={{ transform: "rotate(90deg)" }} />
                      }
                      tooltip="Hide"
                      onClick={() => setToggle(false)}
                    />
                  ) : (
                    <IconButton
                      icon={<HamburgerIcon />}
                      tooltip="View"
                      onClick={() => setToggle(true)}
                    />
                  )}
                </div>
              </IconContainer>
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
            </div>
            {/* <SwipeNext type="next" /> */}
          </CustomSwipeSlide>
        );
      })}
      <CustomSwipeSlide>
        <SwipeNext type="prev" />
        <SelectionBtn onClick={() => onSubmit()}>
          Generate another answer
        </SelectionBtn>
        <SelectionBtn>Get Answer from Quora</SelectionBtn>
      </CustomSwipeSlide>
    </BotChatWrapper>
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
      L
    </SwipeDiv>
  );
};

const WebContainer = styled.div`
  display: flex;
  flex-direction: column;
  aligm-items: center;
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

const SwipeDiv = styled.div`
  padding: 20px;
  cursor: pointer;
  &:hover {
    background: red;
  }
`;

const SelectionBtn = styled.div`
  width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
  aligm-items: center;
  justify-content: center;

  flex-wrap: wrap;
  overflow: wrap;
  margin-left: 20px;
  background: blue;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
`;

const CustomSwipeSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: row;
  aligm-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  aligm-items: center;
  justify-content: space-between;
  margin-top: 20px;

  div {
    display: flex;
    flex-direction: row;
    aligm-items: center;
    justify-content: center;
  }
`;

const BotChatWrapper = styled(Swiper)`
  display: flex;
  flex-direction: row;
  aligm-items: center;
  justify-content: center;
  width: 100%;
  // border-bottom: 1px solid ${({ theme }) => theme.borderColor01};
  padding: 0px 15px;
  padding-top: 25px;
  padding-bottom: 5px;
  background: ${({ theme }) => theme.blue01 + "01"};

  .profile {
    width: 10%;
  }
  .text {
    width: 90%;
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
  }

  .img {
    border-radius: 3px;
    background: brown;
    display: flex;
    flex-direction: row;
    aligm-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
  }
`;
