import React from "react";
import { useChatStore } from "../../utils/store";
import styled from "@emotion/styled";
import { Swiper } from "swiper/react";
import { CustomSwipeSlide } from "./BotChat";

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
        <div className="innerd">
          <div className="profile">
            <img className="img" src={photoURL} alt="img" />
          </div>
          <div className="text">
            <p className="name">{displayName}</p>
            <div
              className="main"
              dangerouslySetInnerHTML={{ __html: text as string }}
            />
          </div>
        </div>
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

  .profile {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 8%;
  }

  .text {
    width: 92%;
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
    .bot {
      min-height: 50px;
    }
  }

  .img {
    border-radius: 300px;
    background: brown;
    display: flex;
    flex-direction: row;
    aligm-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    color: white;
  }
  @media (max-width: 800px) {
    padding: 20px 10px;

    .profile {
      width: 14%;
      justify-content: flex-start;
    }
    .text {
      width: 86%;
      .main {
        margin-top: 5px;
      }
    }
    .img {
      width: 30px;
      height: 30px;
    }
  }
`;

export const BotChatWrapper = styled(UserChatWrapper)<{ w: number }>`
  padding: 0px 15px;
  padding-top: 25px;
  padding-bottom: 5px;
  background: ${({ theme }) => theme.blue01 + "01"};

  width: ${({ w }) => (w < 1200 ? w : 1200)}px;
  max-width: 100vw;
  left: -${({ w }) => (w < 1200 ? `${w / 4.3 - 80}px` : "200px")};

  .text {
    .agains {
      width: 100%;
      margin-top: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .again {
        color: ${({ theme }) => theme.black06};
      }
    }
  }

  @media (max-width: 800px) {
    padding: 10px 10px;
    width: 100%;
    left: 0px;

    .text {
      .agains {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
