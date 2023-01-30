import React from "react";
import ExpertPhoto from "../../components/ExpertPhoto";
import { CustomSwipeSlide } from "./BotChat";
import { DOMAINS } from "../../utils/persona";
import useWindowDimensions from "../../hook/useWindowDimensions";
import styled from "@emotion/styled";

type ChatSlideProps = {
  item?: any;
  type?: "user" | "bot";
  children: React.ReactNode;
  name: React.ReactNode;
  src?: string;
};

const ChatSlideInner = ({ children, item, name, src }: ChatSlideProps) => {
  const { width } = useWindowDimensions();

  return (
    <InnerContainer>
      <div className="profile">
        {item ? <ExpertPhoto domain={item?.job} /> : <ExpertPhoto src={src} />}
        {width < 1100 && <p className="name">{name}</p>}
      </div>
      <div className="text">
        {width >= 1100 && <p className="name">{name}</p>}
        <>{children}</>
      </div>
    </InnerContainer>
  );
};

export default React.memo(ChatSlideInner);

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 750px;

  .profile {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 8%;
  }

  .name {
    font-weight: 700;
    span {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
      font-size: 1em;
      margin-left: 4px;
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;

    .profile {
      width: 100%;
      align-items: center;
      justify-content: flex-start;
    }
    .name {
      margin-left: 10px;
    }
    .text {
      margin-top: 3px;
      padding: 0px 3px;
    }
  }
`;
