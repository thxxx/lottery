import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";
import IconButton from "../../components/IconButton";
import { ArrowLeftIcon, HamburgerIcon, SunIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import Image from "next/image";

type IconContainerProps = {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  saveThisChat: (index: number) => void;
  saved?: boolean;
  index: number;
  id: string | number;
  shared?: boolean;
  clickWebOpen: () => void;
};

const IconContainer = ({
  toggle,
  saved,
  index,
  id,
  shared,
  setToggle,
  saveThisChat,
  clickWebOpen,
}: IconContainerProps) => {
  const toast = useToast();

  const copyToClipboard = (text: string | number) => {
    navigator.clipboard.writeText(String(text)).then(
      () => {
        toast({
          description: "Copied to Clipboard",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const share = async () => {
    copyToClipboard("https://getaid.ai/share?id=" + id + "&saved=" + index);
  };

  return (
    <IconContainerWrapper>
      <div>
        {!shared && (
          <>
            <IconButton
              icon={
                <Image
                  width={25}
                  height={25}
                  alt="bookmark"
                  src={saved ? "/bookmarkfill.svg" : "bookmark.svg"}
                />
              }
              tooltip="Save"
              onClick={() => {
                saveThisChat(index);
              }}
            />
            <IconButton
              icon={
                <Image width={25} height={25} alt="share" src="/share.svg" />
              }
              tooltip="Share"
              onClick={() => {
                share();
              }}
            />
          </>
        )}
      </div>
      <div>
        {toggle ? (
          <IconButton
            icon={
              <Image width={25} height={25} alt="share" src="/up-arrow.svg" />
            }
            tooltip="Hide"
            onClick={() => setToggle(false)}
          />
        ) : (
          <IconButton
            icon={
              <Image
                width={25}
                height={25}
                alt="share"
                src="/hamburger-menu.svg"
              />
            }
            tooltip="View"
            onClick={() => clickWebOpen()}
          />
        )}
      </div>
    </IconContainerWrapper>
  );
};

export default IconContainer;

const IconContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  aligm-items: center;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: row;
    aligm-items: center;
    justify-content: center;
  }
`;
