import React from "react";
import { Card } from "react-bootstrap";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const GetStarted = (props) => {
  const { leftIcon } = props;
  const [lang] = useTranslation("language");
  const router = useRouter();

  return (
    <Card
      className="get-started-wrapper"
      onClick={() => router.push("/getting-started")}>
      <Grid container spacing={2}>
        <Grid
          className="d-flex align-items-start justify-content-start"
          item
          xs={2}>
          <img className="mt-2" src={leftIcon} />
        </Grid>
        <Grid item xs={7}>
          <div className="get-started-content">
            <div className="get-started-link">
              <span>{lang("SIDE_BAR.GET_STARTED.LINK")}</span>
            </div>
            <div className="get-started-title">
              <span>{lang("SIDE_BAR.GET_STARTED.TITLE")}</span>
            </div>
            <div className="get-started-info">
              <span>{lang("SIDE_BAR.GET_STARTED.INFO")}</span>
            </div>
          </div>
        </Grid>
        <Grid
          className="d-flex align-items-start justify-content-end"
          item
          xs={3}>
          <img className="mt-2" src="/assets/images/sidebar-icon.svg" />
        </Grid>
      </Grid>
    </Card>
  );
};
export default GetStarted;
