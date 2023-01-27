import { ArrowForwardIcon, EmailIcon, SunIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import FeedbackModal from "./FeedbackModal";
import Image from "next/image";
import { Home } from "@styled-icons/fluentui-system-filled";
import Link from "next/link";
import { useChatStore } from "../utils/store";
import router from "next/router";

type PagesType = "main" | "chat" | "my";

type AppBarType = {
  page?: PagesType;
  radio?: string;
  onClick?: Dispatch<SetStateAction<string>>;
};

const AppBar = ({ page, onClick, radio }: AppBarType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useChatStore();

  const returnNavi = () => {
    switch (page) {
      case "chat":
      case "main":
        return (
          <>
            {user ? (
              <div
                className="icon"
                onClick={() => {
                  router.push({
                    pathname: "/my",
                  });
                }}>
                <Home />
                <span>MyPage</span>
              </div>
            ) : (
              <div className="icon">
                <Home />
                <span>Login</span>
              </div>
            )}
          </>
        );
      case "my":
        return (
          <>
            <div
              className="icon"
              onClick={() => {
                router.push({
                  pathname: "/chat",
                });
              }}>
              <Home />
              <span>Chat</span>
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <AppBarContainer>
      <div>
        <Link href="/">
          <Image src="/card.png" width={20} height={20} alt="logo" />
          <span>Lottery</span>
        </Link>
        {page === "my" && onClick && (
          <>
            <Radio clicked={radio === "found"} onClick={() => onClick("found")}>
              Found
            </Radio>
            <Radio clicked={radio === "saved"} onClick={() => onClick("saved")}>
              Saved
            </Radio>
          </>
        )}
      </div>
      <div className="icons">{returnNavi()}</div>
      <FeedbackModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </AppBarContainer>
  );
};

export default React.memo(AppBar);

const Radio = styled.div<{ clicked: boolean }>`
  padding: 0px 10px;
  cursor: pointer;
  border-bottom: 1px solid
    ${({ theme, clicked }) => (clicked ? "rgba(200,0,0,1)" : "white")};

  &:hover {
    background-color: ${({ theme }) => theme.hoverBack};
  }
`;

const AppBarContainer = styled.div`
  font-family: Pretendard;
  z-index: 2;
  width: 100%;
  background: white;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor01};
  color: black;
  padding: 14px 4vw;
  cursor: pointer;
  position: absolute;
  top: 0px;
  left: 0px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 10px;
  }

  div,
  a {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }

  .icons {
    .icon {
      margin-left: 15px;
      &:hover {
        color: rgba(0, 0, 0, 0.9);
      }
      span {
        margin-left: 3px;
      }
    }
    color: rgba(0, 0, 0, 0.6);
  }
`;
