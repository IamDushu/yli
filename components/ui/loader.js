import { Skeleton } from "antd";
import React, { Fragment } from "react";

export const Loader = ({ contentType }) => {
  switch (contentType) {
    case "planFeatures":
      return (
        <Fragment>
          <Skeleton.Button active block className="mb-2" />
          <Skeleton.Button active block className="mb-2" />
          <Skeleton.Button active block className="mb-2" />
        </Fragment>
      );
    case "button":
      return (
        <Fragment>
          <Skeleton.Input active className="rounded-pill mr-2" />
        </Fragment>
      );
    default:
      return (
        <Fragment>
          <Skeleton
            active
            avatar
            paragraph={{
              rows: 5,
            }}
          />
          <Skeleton
            active
            avatar
            paragraph={{
              rows: 5,
            }}
          />
          <Skeleton
            active
            avatar
            paragraph={{
              rows: 5,
            }}
          />
        </Fragment>
      );
  }
};
