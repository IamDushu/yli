import React from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";

/****************
@purpose : SEO Intigration
@Author : INIC
******************/
const MetaTags = () => {
  const [lang] = useTranslation("language");
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Head>
      <title>{lang("META.TITLE")}</title>
      <meta name="title" content={lang("META.TITLE")} />
      <meta name="description" content={lang("META.DESCRIPTION")} />
      <meta name="keywords" content={lang("META.KEYWORDS")} />
      <meta name="redirect" content={lang("META.REDIRECT")} />
      <meta name="author" content={lang("META.AUTHOR")} />
      <meta property="og:title" content={lang("META.OG_TITLE")} />
      <meta property="og:description" content={lang("META.OG_DESCRIPTION")} />
      <meta property="og:image" content="/assets/images/brand-logo.svg" />
      <meta property="og:url" content={lang("META.OG_URL")} />
    </Head>
  );
};
export default MetaTags;
