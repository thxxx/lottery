import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import { useSwiper } from "swiper/react";

const SwipeNext = ({ type }: { type: "prev" | "next" }) => {
  const swiper = useSwiper();

  return (
    <SwipeDiv
      onClick={() => {
        type === "prev" && swiper.slidePrev();
        type === "next" && swiper.slideNext();
      }}>
      {type === "next" && (
        <>
          <Image
            width={50}
            height={50}
            alt="right"
            src="/right-double-arrow.svg"
          />
          <p>click to get another response</p>
        </>
      )}
      {type === "prev" && (
        <Image
          width={50}
          height={50}
          alt="right"
          src="/right-double-arrow.svg"
          style={{ transform: "rotate(180deg)" }}
        />
      )}
    </SwipeDiv>
  );
};

export default React.memo(SwipeNext);

const SwipeDiv = styled.div`
  cursor: pointer;
  width: ${150}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.grey};
  font-weight: 700;
  min-height: 140px;

  p {
    margin-top: 15px;
    line-height: 20px;
  }

  &:hover {
    background: ${({ theme }) => theme.grey + "22"};
  }
`;
