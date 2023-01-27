import React from "react";
import { useChatStore } from "../../utils/store";
import styled from "@emotion/styled";

type UserChatProps = {
  text: string;
};

const UserChat = ({ text }: UserChatProps) => {
  const { user } = useChatStore();

  return (
    <UserChatWrapper>
      <div className="profile">
        <img className="img" src={user?.photoURL as string} alt="img" />
      </div>
      <div className="text">
        <p className="name">{user.displayName}</p>
        <div
          className="main"
          dangerouslySetInnerHTML={{ __html: text as string }}
        />
      </div>
    </UserChatWrapper>
  );
};

export default React.memo(UserChat);

export const UserChatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  aligm-items: center;
  justify-content: center;
  width: 100%;
  // border-bottom: 1px solid ${({ theme }) => theme.borderColor01};
  padding: 30px 15px;

  .profile {
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
  }
`;
