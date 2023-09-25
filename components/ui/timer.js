import Countdown from "react-countdown";

import React, { useEffect } from "react";
import { showMessageNotification } from "utils";

export default function TimeCountdown({ setIsTimeUp, key }) {
  const time = localStorage.getItem("quizTimer");
  const renderer = ({ hours, minutes, completed, seconds }) => {
    if (completed) {
      setIsTimeUp(completed);

      // Render a completed state
      return (
        <div className="border-bottom border-dark p-3 d-flex align-items-center justify-content-center">
          <i className="bx bx-timer font-26 text-danger mr-2"></i>
          <h6 className="text-body-14 mb-0">Time's Up!</h6>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div className="border-bottom border-dark p-3 d-flex align-items-center justify-content-center">
          <i className="bx bx-timer font-26 text-danger mr-2"></i>
          <h6 className="text-body-14 mb-0">
            {hours}h {minutes}m {seconds}s
          </h6>
        </div>
      );
    }
  };
  const tickHandler = (e) => {
    localStorage.setItem("quizTimer", e.total / 1000);
    if (Math.floor((time * 1000 * 25) / 100) === e.total) {
      showMessageNotification("Hurry up you're running out of time");
    }
  };
  return (
    // Renderer callback with condition
    <Countdown
      date={Date.now() + time * 1000}
      autoStart={true}
      renderer={renderer}
      onTick={tickHandler}
      key={key}
    />
  );
}
