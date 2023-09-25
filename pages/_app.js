import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import NextNprogress from "nextjs-progressbar";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import WithReduxStore from "@store/with-redux-store";
import { en, it, getCookie } from "@utils";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import dynamic from "next/dynamic";
import Head from "next/head";
// Plugins CSS
import "antd/dist/antd.css";
import "react-selectize/themes/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
// Custom css
import "./../public/assets/scss/style.scss";
import ErrorBoundary from "@components/error-boundary";
import { setCookie, getDefaultLanguage } from "utils";
import SegmentAnalytics from "@components/segment-analytics";
import { ToastContainer } from "react-toastify";

// mui
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../config/theme";
import { createEmotionCache } from "../utils/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

let language = getCookie("language");

i18next.init({
  interpolation: { escapeValue: false },
  lng: language, // default language to use
  resources: {
    en: {
      language: en,
    },
    it: {
      language: it,
    },
  },
});

if (!language) {
  language = getDefaultLanguage();
  setCookie("language", language);
  i18next.changeLanguage(language);
}

const ChatContextProvider = dynamic(
  () => import("context/ChatContext").then((mod) => mod.ChatContextProvider),
  {
    ssr: false,
  }
);

class MyApp extends App {
  /******************** 
  @purpose : Set NextJs Intial Data
  @Parameter : { Component, ctx }
  @Author : INIC
  ******************/
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }
  constructor() {
    super();
  }
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  render() {
    const {
      Component,
      pageProps,
      reduxStore,
      emotionCache = clientSideEmotionCache,
    } = this.props;

    return (
      <ErrorBoundary>
        <SegmentAnalytics />
        <ToastContainer />
        <I18nextProvider i18n={i18next}>
          {/******************** 
          @purpose : Page Load Progress Bar
          @Author : INIC
          ********************/}
          <NextNprogress
            color="#0f6bbf"
            startPosition={0.3}
            stopDelayMs={200}
            height="5"
            options={{ easing: "ease", speed: 500 }}
          />
          {/******************** 
          @purpose : Connect Application With Redux
          @Author : INIC
          ********************/}
          <CacheProvider value={emotionCache}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <Provider store={reduxStore}>
              <GoogleReCaptchaProvider reCaptchaKey="6Ldx4GweAAAAAGqpejDmG_ySsXwWPBcxUKIW6Nbg">
                {/******************** 
              @purpose : Bind Application components
              @Author : INIC
              ********************/}
                <ChatContextProvider>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                  </ThemeProvider>
                </ChatContextProvider>
              </GoogleReCaptchaProvider>
            </Provider>
          </CacheProvider>
        </I18nextProvider>
      </ErrorBoundary>
    );
  }
}
export default WithReduxStore(MyApp);
