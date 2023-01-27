import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction } from "react";
import IconButton from "../../components/IconButton";
import { ArrowLeftIcon, HamburgerIcon, SunIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

type IconContainerProps = {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  saveThisChat: (index: number) => void;
  saved?: boolean;
  index: number;
  id: string | number;
  shared?: boolean;
};

const IconContainer = ({
  toggle,
  saved,
  index,
  id,
  shared,
  setToggle,
  saveThisChat,
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
    copyToClipboard("localhost:3000/share?id=" + id + "&saved=" + index);
  };

  return (
    <IconContainerWrapper>
      <div>
        {!shared && (
          <>
            <IconButton
              icon={<SunIcon color={saved ? "red.400" : "blackAlpha.300"} />}
              tooltip="Save"
              onClick={() => {
                saveThisChat(index);
              }}
            />
            <IconButton
              icon={<SunIcon />}
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
            icon={<ArrowLeftIcon style={{ transform: "rotate(90deg)" }} />}
            tooltip="Hide"
            onClick={() => setToggle(false)}
          />
        ) : (
          <IconButton
            icon={<HamburgerIcon />}
            tooltip="View"
            onClick={() => setToggle(true)}
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
  margin-top: 20px;

  div {
    display: flex;
    flex-direction: row;
    aligm-items: center;
    justify-content: center;
  }
`;
