import { ArrowForwardIcon, EmailIcon, SunIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import FeedbackModal from "./FeedbackModal";
import Image from "next/image";
import { Home } from "@styled-icons/fluentui-system-filled";
import Link from "next/link";

const AppBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AppBarContainer>
      <div>
        <Link href="/">
          <Image src="/card.png" width={20} height={20} alt="logo" />
          <span>Lottery</span>
        </Link>
      </div>
      <div className="icons">
        <div className="icon">
          <Home />
          <span>Home</span>
        </div>
        <div className="icon">
          <EmailIcon />
          <span>Contact</span>
        </div>
        <div className="icon">
          <SunIcon />
        </div>
      </div>
      <FeedbackModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </AppBarContainer>
  );
};

export default React.memo(AppBar);

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
