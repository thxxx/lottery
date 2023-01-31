import styled from "@emotion/styled";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import FeedbackModal from "./FeedbackModal";
import Image from "next/image";
import Link from "next/link";
import { useChatStore } from "../utils/store";
import router from "next/router";
import { authService, firebaseInstance } from "../utils/fbase";
import useWindowDimensions from "../hook/useWindowDimensions";
import { EmailIcon, HamburgerIcon } from "@chakra-ui/icons";

type PagesType = "main" | "chat" | "my" | "share";

type AppBarType = {
  page?: PagesType;
  radio?: string;
  onClick?: Dispatch<SetStateAction<"found" | "saved">>;
};

const AppBar = ({ page, onClick, radio }: AppBarType) => {
  const { user } = useChatStore();
  const { width } = useWindowDimensions();
  const [isDrawer, setIsDrawer] = useState(false);
  const [isFeedback, setIsFeedback] = useState(false);
  const btnRef = useRef(null);

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
            {width < 800 ? (
              <>
                <div ref={btnRef} onClick={() => setIsDrawer(true)}>
                  <HamburgerIcon width={5} height={5} />
                </div>
                <Drawer
                  closeOnEsc
                  closeOnOverlayClick
                  isOpen={isDrawer}
                  placement="right"
                  onClose={() => setIsDrawer(false)}
                  finalFocusRef={btnRef}>
                  <DrawerOverlay />
                  <CustomDrawer>
                    <DrawerCloseButton />
                    <DrawerHeader>AID</DrawerHeader>
                    <DrawerBody>
                      <div>
                        <MenuNaviButton
                          className="item"
                          onClick={() => {
                            router.push({
                              pathname: "/my",
                            });
                          }}>
                          <Image
                            src="/my.png"
                            width={20}
                            height={20}
                            alt="mypage"
                          />
                          <p>My Page</p>
                        </MenuNaviButton>
                        <MenuNaviButton className="item" onClick={() => {}}>
                          <Image
                            src="/discord_black.svg"
                            width={20}
                            height={20}
                            alt="discord"
                          />
                          <p>Join</p>
                        </MenuNaviButton>
                        <MenuNaviButton
                          className="item"
                          onClick={() => {
                            setIsFeedback(true);
                          }}>
                          <Image
                            src="/message_black.svg"
                            width={19}
                            height={19}
                            alt="mypage"
                          />
                          <p>Feedback</p>
                        </MenuNaviButton>
                        <MenuNaviButton
                          className="item"
                          onClick={() => {
                            window.open("mailto:contact@diceyai.com");
                          }}>
                          <EmailIcon />
                          <p>Contact us</p>
                        </MenuNaviButton>
                      </div>
                    </DrawerBody>
                    <DrawerFooter>
                      <CustomButton onClick={() => setIsDrawer(false)}>
                        Cancel
                      </CustomButton>
                    </DrawerFooter>
                  </CustomDrawer>
                </Drawer>
              </>
            ) : (
              <>
                <>
                  <NaviButton
                    onClick={() => {
                      window.open("https://naver.com");
                    }}>
                    <Image
                      src="/discord.svg"
                      width={20}
                      height={20}
                      alt="discord"
                    />
                    <p>Join</p>
                  </NaviButton>
                  <NaviButton
                    onClick={() => {
                      setIsFeedback(true);
                    }}>
                    <Image
                      src="/message.svg"
                      width={15}
                      height={15}
                      alt="mypage"
                    />
                    <p>Feedback</p>
                  </NaviButton>
                  <NaviButton
                    onClick={() => {
                      window.open("mailto:contact@diceyai.com");
                    }}>
                    <EmailIcon />
                    <p>Contact</p>
                  </NaviButton>
                </>
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
                  <Radio
                    clicked={false}
                    className="icon"
                    onClick={() => doLogin()}>
                    Login
                  </Radio>
                )}
              </>
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
        {user ? (
          <>{returnNavi()}</>
        ) : (
          <>
            <Radio className="icon" onClick={() => doLogin()}>
              Login
            </Radio>
          </>
        )}
      </div>
      <FeedbackModal
        isOpen={isFeedback}
        onClose={() => setIsFeedback(false)}
        onOpen={() => setIsFeedback(true)}
      />
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
  padding: 0px 2vw;
  height: 55px;
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

const CustomDrawer = styled(DrawerContent)`
  display: flex;
  flex-direction: column;
  color: #2d1c2a;
  font-weight: 700;
  padding: 0px;

  .item {
    padding: 14px 5px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    margin: 0px 0px;
    border-radius: 6px;

    &:hover {
      background-color: ${({ theme }) => theme.hoverBack};
    }
  }
`;

const NaviButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  p {
    margin-left: 6px;
  }
  padding: 5px 8px;
  cursor: pointer;
  border: none;
  transition: 0.15s ease;
  border-radius: 6px;
  margin-left: 3px;
  color: ${({ theme }) => "rgba(40,40,70,0.6)"};
  font-weight: 900;
  font-size: 15px;
  font-family: Pretendard;

  &:hover {
    background-color: ${({ theme }) => theme.hoverBack};
  }
`;

const MenuNaviButton = styled(NaviButton)`
  text-align: left;
  justify-content: flex-start;
  font-size: 17px;
  color: black;

  p {
    margin-left: 13px;
  }
`;

export const CustomButton = styled.button`
  border-radius: 6px;
  padding: 10px;
  background: white;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.bgColor04};

  &:hover {
    background-color: ${({ theme }) => theme.hoverBack};
  }
`;
