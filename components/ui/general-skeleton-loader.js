import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const GeneralSkeletonLoader = () => {
  return (
    <div className="container">
      <div className="offline-inner">
        <div style={{ fontSize: 20, lineHeight: 2 }}>
          <h1>
            <Skeleton count={2} />
          </h1>
          <h3>
            <Skeleton count={2} />
          </h3>
          <h3>
            <Skeleton count={2} />
          </h3>
          <h3>
            <Skeleton count={2} />
          </h3>
          <h3>
            <Skeleton count={2} />
          </h3>
          <h3>
            <Skeleton count={2} />
          </h3>
          <h3>
            <Skeleton count={2} />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GeneralSkeletonLoader;
