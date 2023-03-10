import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";
// import { useChatStore } from "../utils/store";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "../styles/theme";
import { useChatStore } from "../utils/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as ga from "../lib/gtag";
import Script from "next/script";
import { authService } from "../utils/fbase";
import TagManager, { TagManagerArgs } from "react-gtm-module";
import Head from "next/head";
import {uuid} from "uuidv4"

function MyApp({ Component, pageProps }: AppProps) {
  const { darkMode, isLoggedIn, setIsLoggedIn, setUser } = useChatStore();
  const [init, setInit] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  const tagManagerArgs: TagManagerArgs = {
    gtmId: ga.GTM_TRACKING_ID,
  };

  const router = useRouter();

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);

    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const count = localStorage.getItem("logInCount");
    if (!count) localStorage.setItem("logInCount", JSON.stringify(0));
    const uuidd = localStorage.getItem("uuid");
    if (!uuidd) localStorage.setItem("uuid", JSON.stringify(uuid()));

    authService.onAuthStateChanged((user) => {
      if (user) {
        const body = {
          displayName: (user.multiFactor as any).user.displayName,
          photoURL: (user.multiFactor as any).user.photoURL,
          email: (user.multiFactor as any).user.email,
          uid: (user.multiFactor as any).user.uid,
        };
        setUser(body);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <ChakraProvider>
      <Head>
        <title>AID AI : Quora through conversation AI</title>
        <meta
          name="description"
          content="AID is a AI assistant that can give you the most appropriate answers to all your questions."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Script
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
        
      />
      <ThemeProvider theme={theme}>
        <MobileContainer>
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
    color: #1d1c2f;

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
