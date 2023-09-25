import React from "react";

const FourZeroFour = () => {
  /******************* 
	@purpose : Rander HTML/ React Components
	@Author : INIC
	******************/
  return (
    <div className="error-page">
      <div className="error-middle">
        <h2>Oops! Page not Found</h2>
        <h1>
          <span className="first-char">4</span>
          <span>0</span>
          <span className="last-char">4</span>
        </h1>
        <p className="text-black">We can't find the page you're looking for.</p>
        <div className="back-home">
          <a className="btn btn-primary" href="/dashboard">
            Go to Home Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default FourZeroFour;
