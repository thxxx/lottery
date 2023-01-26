import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowForwardIcon, Search2Icon } from "@chakra-ui/icons";
import { Button, Textarea } from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

type InputType = {
  onSubmit: () => void;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

type StatusType = "typing..." | "end" | "finishing";

const InputWrapper = ({ onSubmit, text, setText }: InputType) => {
  const [status, setStatus] = useState<StatusType>("typing...");
  let isEnd = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (status === "finishing") {
      console.log("1.2초 세고, 입력 없으면 그대로 제출");
      const to = setTimeout(() => {
        if (isEnd.current) {
          console.log("제출", isEnd.current);
          // if (inputRef.current) inputRef.current?.style.height = "52px";
          onSubmit();
          setStatus("end");
        }
        clearTimeout(to);
      }, 1200);
    }
  }, [status, onSubmit]);

  const auto_grow = (element: any) => {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + 4 + "px";

    isEnd.current = false;
    setStatus("typing...");

    if (element.value.slice(-1) === "." || element.value.slice(-1) === "?") {
      isEnd.current = true;
      setStatus("finishing");
    }
  };

  const addPrompt = (prompt: string) => {
    inputRef.current && inputRef.current.focus();
    setText(text + prompt);
  };

  return (
    <InputOuter>
      <Menu>
        <CustomMenuList>
          <div className="desc">Good text if you add.</div>
          <MenuItem onClick={() => addPrompt("Download")}>Download</MenuItem>
          <MenuItem onClick={() => addPrompt("Create a Copy")}>
            Create a Copy
          </MenuItem>
          <MenuItem onClick={() => addPrompt("Mark as Draft")}>
            Mark as Draft
          </MenuItem>
        </CustomMenuList>
        <p className="noti">
          <span>{status}</span> &nbsp; Please type . or ? and wait to ask
        </p>
        <InputContainer
          onSubmit={(e) => {
            console.log("제출");
            e.preventDefault();
            onSubmit();
          }}>
          {/* <Search2Icon className="search" color="gray.400" /> */}
          <Textarea
            ref={inputRef}
            rows={1}
            placeholder="Please ask..."
            value={text}
            onKeyDown={(e) => {
              if (!e.shiftKey && (e.code === "Enter" || e.keyCode === 13)) {
                e.preventDefault();
                inputRef.current?.style.height = "52px";
                onSubmit();
              }
            }}
            onChange={(e) => {
              auto_grow(e.currentTarget);
              setText(e.currentTarget.value);
            }}
          />
          {/* <span
          className="send"
          onClick={() => {
            onSubmit();
          }}>
          <ArrowForwardIcon className="send_icon" color="white" />
        </span> */}
        </InputContainer>
        <div>
          <PromptButton as={Button}>
            <ArrowForwardIcon className="icon" color="black" />
            <span>Show good prompts</span>
          </PromptButton>
        </div>
      </Menu>
    </InputOuter>
  );
};

export default React.memo(InputWrapper);

const CustomMenuList = styled(MenuList)`
  .desc {
    padding: 2px 10px;
  }
`;

const InputOuter = styled.div`
  background: white;
  position: fixed;
  bottom: 0px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 800px;
  width: 100%;

  .noti {
    font-size: 0.8em;
    margin-bottom: 5px;
  }
`;

const PromptButton = styled(MenuButton)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 600px;
  padding: 0px 12px;
  height: 30px;
  font-weight: 700;
  margin-top: 5px;
  font-size: 0.9em;

  &:hover {
    background: ${({ theme }) => theme.hoverBack};
  }
`;

export const InputContainer = styled.form`
  position: relative;
  width: 100%;

  textarea {
    border: 1px solid ${({ theme }) => theme.borderColor01};
    border-radius: 8px;
    padding: 12px 18px;
    font-size: 1.1em;
    overflow: scroll;
    height: 52px;
    max-height: 140px;
    resize: none;

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.5);
    }

    &:focus {
      outline: none;
    }
  }

  .search {
    position: absolute;
    top: 13px;
    left: 10px;
    width: 18px;
    height: 18px;
  }

  .send {
    z-index: 2;
    position: absolute;
    right: 7px;
    top: 6px;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background: ${({ theme }) => theme.blue01};
    display: flex;
    align-items: center;
    justify-content: center;

    .send_icon {
      color: white;
      width: 15px;
      height: 15px;
    }
  }
`;
