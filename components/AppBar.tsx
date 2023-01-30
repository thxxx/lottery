import { ArrowForwardIcon, EmailIcon, SunIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import FeedbackModal from "./FeedbackModal";
import Image from "next/image";
import { Home } from "@styled-icons/fluentui-system-filled";
import Link from "next/link";
import { useChatStore } from "../utils/store";
import router from "next/router";
import { authService, firebaseInstance } from "../utils/fbase";

type PagesType = "main" | "chat" | "my" | "share";

type AppBarType = {
  page?: PagesType;
  radio?: string;
  onClick?: Dispatch<SetStateAction<"found" | "saved">>;
};

const AppBar = ({ page, onClick, radio }: AppBarType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useChatStore();

  const doLogin = useCallback(async () => {
    let provider;
    provider = new firebaseInstance.auth.GoogleAuthProvider();

    await authService
      .signInWithPopup(provider)
      .then((res) => {
        router.replace(router.asPath);
        console.log("Successfully Logged In!");
      })
      .catch((err) => {
        console.log("Err occured! ", err);
      });
  }, []);

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
                <Image src="/my.png" width={24} height={24} alt="mypage" />
              </div>
            ) : (
              <Radio clicked={false} className="icon" onClick={() => doLogin()}>
                Login
              </Radio>
            )}
          </>
        );
      case "my":
        return (
          <>
            <Radio
              onClick={() => {
                router.push({
                  pathname: "/chat",
                });
              }}>
              Chat
            </Radio>
          </>
        );
      case "share":
        return (
          <>
            {user ? (
              <Radio
                onClick={() => {
                  router.push({
                    pathname: "/chat",
                  });
                }}>
                Chat
              </Radio>
            ) : (
              <Radio className="icon" onClick={() => doLogin()}>
                Login
              </Radio>
            )}
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
          <span>AID</span>
        </Link>
        {page === "my" && onClick && (
          <>
            <Radio clicked={radio === "found"} onClick={() => onClick("found")}>
              Recent
            </Radio>
            <Radio clicked={radio === "saved"} onClick={() => onClick("saved")}>
              Saved
            </Radio>
          </>
        )}
      </div>
      <div className="icons">
        {page === "main" && (
          <>
            <Radio onClick={() => {}}>Discord</Radio>
            <Radio onClick={() => {}}>Contact us</Radio>
          </>
        )}
        {returnNavi()}
      </div>
      <FeedbackModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </AppBarContainer>
  );
};

export default React.memo(AppBar);

export const Radio = styled.span<{ clicked?: boolean }>`
  padding: 5px 10px;
  cursor: pointer;
  transition: 0.15s ease;
  border-radius: 6px;
  margin-left: 10px;
  color: ${({ theme, clicked }) =>
    clicked ? theme.blue01 : "rgba(0,0,0,0.7)"};

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
  padding: 0px 4vw;
  height: 57px;
  position: absolute;
  top: 0px;
  left: 0px;

  @media (max-width: 800px) {
    height: 50px;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 700;

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
      cursor: pointer;
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
