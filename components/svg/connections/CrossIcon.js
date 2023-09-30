import React from "react";

function CrossIcon({ fill = "#051F4E" }) {
  return (
    <svg
      width="12"
      height="9"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.7636 0L8.375 6.38857L1.98643 0L0.375 1.61143L6.76357 8L0.375 14.3886L1.98643 16L8.375 9.61143L14.7636 16L16.375 14.3886L9.98643 8L16.375 1.61143L14.7636 0Z"
        fill={fill}
      />
    </svg>
  );
}

export default CrossIcon;
