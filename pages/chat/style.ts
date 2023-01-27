import styled from "@emotion/styled";
import { UserChatWrapper } from "./UserChat";

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: blue;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px 0px;
`;

export const ChatContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const BottomContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.bgColor02};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

export const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bgColor};
  // height: 100vh;
  padding-bottom: 200px;
  padding-top: 50px;
`;
export const BotChatWrapper = styled(UserChatWrapper)`
  background: ${({ theme }) => theme.blue01 + "22"};
`;
