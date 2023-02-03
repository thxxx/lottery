import React from "react";
import { useChatStore } from "../../utils/store";
import styled from "@emotion/styled";
import { Swiper } from "swiper/react";
import { CustomSwipeSlide } from "./BotChat";
import ExpertPhoto from "../../components/ExpertPhoto";
import ChatSlideInner from "./ChatSlide";

type UserChatProps = {
  text: string;
  displayName?: string;
  photoURL?: string;
};

const UserChat = ({ text, displayName, photoURL }: UserChatProps) => {
  return (
    <UserChatWrapper
      spaceBetween={26}
      slidesPerView={1}
      allowTouchMove={false}
      scrollbar={{ draggable: true }}>
      <CustomSwipeSlide>
        <ChatSlideInner
          src={photoURL ? photoURL : "favicon.png"}
          name={displayName ? displayName : "You"}>
          <div
            className="main"
            dangerouslySetInnerHTML={{ __html: text as string }}
          />
        </ChatSlideInner>
      </CustomSwipeSlide>
    </UserChatWrapper>
  );
};

export default React.memo(UserChat);

export const UserChatWrapper = styled(Swiper)`
  display: flex;
  flex-direction: row;
  aligm-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  padding: 30px 15px;
  width: 100%;

  .text {
    width: 92%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    .main {
      margin-top: 10px;
      line-height: 1.7em;
      font-size: 1em;

      .loadings {
        width: 600px;
      }
      .loading {
        animation: expandWidth 2s ease-in-out infinite;
      }

      @keyframes expandWidth {
        from {
          width: 0%;
        }
        to {
          width: 90%;
        }
      }
    }

    .bot {
      min-height: 50px;
    }
  }

  @media (max-width: 1100px) {
    padding: 20px 10px;
    .text {
      width: 100%;
      .main {
        width: 100%;
        margin-top: 5px;
        .loadings {
          width: 250px;
        }
      }
    }
  }
`;

export const BotChatWrapper = styled(UserChatWrapper)<{
  w: number;
}>`
  padding: 0px 15px;
  padding-top: 25px;
  padding-bottom: 5px;
  background-color: rgba(0, 0, 0, 0);

  width: ${({ w }) => (w < 1100 ? w : 1100)}px;
  max-width: 100vw;
  left: -${({ w }) => (w < 1100 ? `${w / 4.3 - 80}px` : "150px")};

  .text {
    .agains {
      width: 100%;
      margin-top: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-width: 1100px) {
    padding: 10px 10px;
    width: 100%;
    left: 0px;

    .text {
      .agains {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        min-height: 100px;
      }
    }
  }
`;
