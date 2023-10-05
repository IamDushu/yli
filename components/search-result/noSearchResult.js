import React from "react";
import { Card, CardContent, Grid } from "@mui/material";

export default function NoSearchResult({ lang }) {
  return (
    <div style={{ height: "200vh" }}>
      <Card>
        <CardContent className="py-5">
          <Grid container>
            <Grid item md={8} lg={8} className="mx-auto">
              <div className="mb-2 font-weight-normal">
                <p className="font-22 mb-0">
                  {lang("GLOBAL_SEARCH.NO_RESULT")}
                  <span className="font-italic ">
                    {lang("COMMON.ABRACADABRA")}
                  </span>
                </p>

                <p className="font-22">
                  {lang("GLOBAL_SEARCH.NO_RESULT_DESC")}
                </p>
              </div>

              <img
                src="/assets/images/no-result-new.svg"
                alt={lang("GLOBAL_SEARCH.NO_RESULT")}
                className="mb-5"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
