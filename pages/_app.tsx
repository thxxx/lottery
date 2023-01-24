import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";
// import { useChatStore } from "../utils/store";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "../styles/theme";
import { useChatStore } from "../utils/store";
import AppBar from "../components/AppBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as ga from "../lib/gtag";
import Script from "next/script";
import { authService } from "../utils/fbase";

function MyApp({ Component, pageProps }: AppProps) {
  const { darkMode } = useChatStore();
  const theme = darkMode ? darkTheme : lightTheme;

  const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     ga.pageview(url);
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   router.events.on("hashChangeComplete", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //     router.events.off("hashChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useChatStore();

  useEffect(() => {
    // 유저가 제작한 랜딩페이지에 들어가는 사람들까지 로그인 검사를 하면 속도가 느려지니까
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user.multiFactor.user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <ChakraProvider>
      {/* <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ga.GA_TRACKING_ID}`}
      />
      <Script
        id="myscript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      /> */}
      <ThemeProvider theme={theme}>
        <MobileContainer>
          <AppBar />
          <div className="backdrop" />
          {init && (
            <div className="inner">
              <Component {...pageProps} />
            </div>
          )}
        </MobileContainer>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default MyApp;

const MobileContainer = styled.div`
  font-family: Pretendard;
  width: 100%;
  background: ${({ theme }) => theme.bgColor};
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Pretendard;
  transition: 3s ease;

  .inner {
    width: 800px;
    min-height: 100vh;
    transition: 3s ease;
    z-index: 1;

    @media (max-width: 900px) {
      width: 100%;
    }
  }

  .backdrop {
    background: ${({ theme }) => theme.bgColor + "88"};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100vw;
    height: 100vh;
  }
`;
