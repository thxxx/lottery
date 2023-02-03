import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useState } from "react";
import IconButton from "../../components/IconButton";
import { CopyIcon, LinkIcon } from "@chakra-ui/icons";
import { MenuItem, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { CustomMenuList } from "../../components/chat/InputWrapper";
import BottomSheet from "../../components/BottomSheet";
import useWindowDimensions from "../../hook/useWindowDimensions";
import { useChatStore } from "../../utils/store";
import { dbService } from "../../utils/fbase";
import { LogDataType, LogType, notLogList } from "../../utils/notLoggingList";

type IconContainerProps = {
  toggle: boolean;
  response: string;
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
  response,
  setToggle,
  saveThisChat,
  clickWebOpen,
}: IconContainerProps) => {
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const { isLoggedIn, user } = useChatStore();
  const toast = useToast();
  const { width } = useWindowDimensions();

  const copyToClipboard = (text: string | number) => {
    navigator.clipboard.writeText(String(text)).then(
      () => {
        toast({
          description: "Copied to clipboard",
          duration: 3000,
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const share = async (type: "link" | "text") => {
    if (!isLoggedIn) {
      toast({
        description: "You have to login to share",
      });
      return;
    }

    const uuidd = localStorage.getItem("uuid");
    let body: LogDataType = {
      questionId: id,
      userId: user ? user.uid : uuidd ? uuidd : "notLoggedIn",
      loggedAt: new Date(),
      type: LogType.SHARE,
    };

    if (type === "link") {
      body.type = LogType.SHARE;
      copyToClipboard("https://getaid.ai/share?id=" + id + "&saved=" + index);
    }
    if (type === "text") {
      body.type = LogType.COPY;
      copyToClipboard(response.replace(/<[^>]*>/g, " "));
    }
    if (user && notLogList.includes(user.uid)) return;
    await dbService.collection("log").add(body);
  };

  return (
    <IconContainerWrapper>
      <div>
        <Menu>
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
                  width > 1100 ? (
                    <MenuButton>
                      <Image
                        width={25}
                        height={25}
                        alt="share"
                        src="/share.svg"
                      />
                    </MenuButton>
                  ) : (
                    <Image
                      width={25}
                      height={25}
                      alt="share"
                      src="/share.svg"
                    />
                  )
                }
                tooltip="Share"
                onClick={() => {
                  if (width < 1100) setIsBottomOpen(true);
                }}
              />
              <CustomMenuList>
                <div className="shares">
                  <MenuItem onClick={() => share("link")}>
                    <div className="copy">
                      <LinkIcon />
                      <div>Copy link to share</div>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={() => share("text")}>
                    <div className="copy">
                      <CopyIcon />
                      <div>Copy Text</div>
                    </div>
                  </MenuItem>
                </div>
              </CustomMenuList>
            </>
          )}
        </Menu>
        {width < 1100 && (
          <BottomSheet
            isBottomOpen={isBottomOpen}
            setBottomOpen={setIsBottomOpen}>
            <div
              className="copy"
              onClick={() => {
                share("link");
                setIsBottomOpen(false);
              }}>
              <LinkIcon />
              <span>Copy link to share</span>
            </div>
            <div
              className="copy"
              onClick={() => {
                share("text");
                setIsBottomOpen(false);
              }}>
              <CopyIcon />
              <span>Copy Text</span>
            </div>
          </BottomSheet>
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

export default React.memo(IconContainer);

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

  .shares {
    flex-direction: column;
    width: 100%;
    .copy {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      text-align: left;
      font-weight: 700;
      div {
        margin-left: 10px;
      }
    }
  }
`;
