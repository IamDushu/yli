import React from "react";
import Skeleton from "react-loading-skeleton"; // React skeleton loader view
import "react-loading-skeleton/dist/skeleton.css";
/******************* 
@Purpose : Used for loader view
@Parameter : {}
@Author : INIC
******************/
function SkeletonLoader() {
  return (
    <div>
      <h1>
        <Skeleton count={3} />
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
  );
}
export default SkeletonLoader;
