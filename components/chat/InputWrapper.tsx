import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowForwardIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Textarea } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { PromptType, prompts } from "../../utils/prompts";
import { useChatStore } from "../../utils/store";
import { isMobile } from "react-device-detect";

type InputType = {
  text: string;
  loading?: boolean;
  onSubmit: (text: string, option: number) => void;
  setText: Dispatch<SetStateAction<string>>;
};

type StatusType = "typing..." | "end" | "finishing";

const InputWrapper = ({ text, loading, setText, onSubmit }: InputType) => {
  const [status, setStatus] = useState<StatusType>("typing...");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [nowPrompts, setNowPrompts] = useState<PromptType[]>();
  const [option, setOption] = useState(0);
  const [prompt, setPrompt] = useState("");
  const { job } = useChatStore();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  let isEnd = useRef(false);

  useEffect(() => {
    if (!isMobile) inputRef.current && inputRef.current.focus();
  }, [job]);

  useEffect(() => {
    setNowPrompts(
      prompts
        .filter((doc) => doc.domain === job || doc.domain === "default")
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
    );
  }, [job, option]);

  const callSubmit = useCallback(() => {
    if (status !== "end") {
      onSubmit(text, option);
      setStatus("end");
      setOption(0);
      isEnd.current = false;
    }
  }, [status, text, option, onSubmit]);

  useEffect(() => {
    if (status === "finishing") {
      console.log("1.2초 세고, 입력 없으면 그대로 제출");
      const to = setTimeout(() => {
        if (isEnd.current) {
          // if (inputRef.current) inputRef.current?.style.height = "52px";
          callSubmit();
        }
        clearTimeout(to);
      }, 1200);
    }
  }, [status, callSubmit]);

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

  const addPrompt = (prompt: string, tag: number) => {
    inputRef.current && inputRef.current.focus();
    setPrompt(prompt);
    setOption(tag);
  };

  return (
    <InputOuter>
      <div className="inners">
        {isInputFocused && (
          <p className="noti">
            <span>{status}</span> &nbsp; Please type <strong>.</strong> or{" "}
            <strong>?</strong> and wait to ask
          </p>
        )}
        <InputContainer
          onSubmit={(e) => {
            e.preventDefault();
            callSubmit();
          }}>
          {/* <Search2Icon className="search" color="gray.400" /> */}
          <Textarea
            onClick={() => {
              console.log(11);
              window.scrollTo(0, 10000);
            }}
            transitionDelay="0.03"
            disabled={loading}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            ref={inputRef}
            rows={1}
            placeholder="Please ask..."
            value={text}
            onKeyDown={(e) => {
              if (!e.shiftKey && (e.code === "Enter" || e.keyCode === 13)) {
                e.preventDefault();
                (inputRef.current as any).style.height = "52px";
                if (status === "typing...") callSubmit();
              }
            }}
            style={{
              border: `1px solid ${
                status === "finishing" ? "#8D9EFF" : "black"
              }`,
            }}
            onChange={(e) => {
              auto_grow(e.currentTarget);
              setText(e.currentTarget.value);
            }}
          />
        </InputContainer>
        <div>
          <Menu>
            <CustomMenuList>
              {/* <div className="desc">Good text if you add.</div> */}
              {nowPrompts?.map((item) => {
                return (
                  <CustomMenuItem
                    key={item.tag}
                    onClick={() => addPrompt(item.text, item.tag)}>
                    {item.text.slice(0, 1).toUpperCase() + item.text.slice(1)}
                  </CustomMenuItem>
                );
              })}
            </CustomMenuList>
            <PromptButton as={Button}>
              {prompt ? (
                <>
                  <CheckIcon className="icon" color="purple.400" w={3} mr={1} />
                  <span>{prompt}</span>
                </>
              ) : (
                <>
                  <ArrowForwardIcon className="icon" color="black" />
                  <span>Press if you want better answer</span>
                </>
              )}
            </PromptButton>
            {/* <CloseIcon
                className="icon"
                color="black"
                w={2}
                ml={1}
                onClick={() => setPrompt("")}
              /> */}
          </Menu>
        </div>
      </div>
    </InputOuter>
  );
};

export default React.memo(InputWrapper);

export const CustomMenuList = styled(MenuList)`
  display: flex;
  flex-direction: column;
  border: 1.5px solid ${({ theme }) => theme.black04};
  max-width: 100vw;

  .desc {
    padding: 4px 10px;
    padding-bottom: 8px;
  }
`;

const InputOuter = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0), 10%, white);
  backdrop-filter: blur(3px);
  z-index: 3;
  position: fixed;
  bottom: 0px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  width: 100%;

  .noti {
    font-size: 0.8em;
    margin-bottom: 5px;

    strong {
      background: ${({ theme }) => theme.bgColor03};
      padding: 0px 4px;
      border-radius: 3px;
    }
  }

  .inners {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: 800px;
    width: 100%;

    @media (max-width: 800px) {
      width: 95%;
    }
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
  margin-top: 2px;
  font-size: 0.9em;
  background: rgba(0, 0, 0, 0);

  &:hover {
    background: ${({ theme }) => theme.hoverBack};
  }
`;

export const InputContainer = styled.form`
  position: relative;
  width: 100%;
  background: white;

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

  .btn {
    display: flex;
    flex-direction: row;
  }
`;

const CustomMenuItem = styled(MenuItem)`
  flex-wrap: wrap;
`;
