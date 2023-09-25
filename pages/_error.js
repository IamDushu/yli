import React from "react";
import { Link } from "@routes"; //Access routing
import { HOME } from "@routes/urls";

const NotFound = () => {
  /******************* 
	@purpose : Rander HTML/ React Components
	@Author : INIC
	******************/
  return (
    <div className="">
      <div className="error-wrap">
        <div className="content-404">
          <div className="content-404-title">Error</div>
          <div className="content-404-link">
            <Link route={HOME}>
              <a className="btn btn-primary mt-50" title="Back To Home">
                <span className="icon-left-caret"></span>Back To Home{" "}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
