import React from "react";
import styled from "@emotion/styled";
import IconButton from "../../components/IconButton";
import { SunIcon } from "@chakra-ui/icons";

type BotChatType = {
  text: string;
};

const BotChat = ({ text }: BotChatType) => {
  return (
    <BotChatWrapper>
      <div className="profile">
        <span className="img">전문가</span>
      </div>
      <div className="text">
        <p>{text}</p>
        <IconContainer>
          <div>
            <IconButton icon={<SunIcon />} tooltip="Save" />
            <IconButton icon={<SunIcon />} tooltip="Save" />
          </div>
          <div>
            <IconButton icon={<SunIcon />} tooltip="Save" />
          </div>
        </IconContainer>
      </div>
    </BotChatWrapper>
  );
};

export default React.memo(BotChat);

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  aligm-items: center;
  justify-content: space-between;
  margin-top: 10px;

  div {
    display: flex;
    flex-direction: row;
    aligm-items: center;
    justify-content: center;
  }
`;

const BotChatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  aligm-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor01};
  padding: 25px 15px;
  background: ${({ theme }) => theme.blue01 + "22"};

  .profile {
    width: 10%;
  }
  .text {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
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
