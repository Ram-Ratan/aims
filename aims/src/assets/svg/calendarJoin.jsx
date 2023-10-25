import React from "react";

const CalendarJoin = ({ selected, ...rest }) => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 8.33317H1.5M12.3333 1.6665V4.99984M5.66667 1.6665V4.99984M7.75 11.6665L9 10.8332V14.9998M7.95833 14.9998H10.0417M5.5 18.3332H12.5C13.9001 18.3332 14.6002 18.3332 15.135 18.0607C15.6054 17.821 15.9878 17.4386 16.2275 16.9681C16.5 16.4334 16.5 15.7333 16.5 14.3332V7.33317C16.5 5.93304 16.5 5.23297 16.2275 4.69819C15.9878 4.22779 15.6054 3.84534 15.135 3.60565C14.6002 3.33317 13.9001 3.33317 12.5 3.33317H5.5C4.09987 3.33317 3.3998 3.33317 2.86502 3.60565C2.39462 3.84534 2.01217 4.22779 1.77248 4.69819C1.5 5.23297 1.5 5.93304 1.5 7.33317V14.3332C1.5 15.7333 1.5 16.4334 1.77248 16.9681C2.01217 17.4386 2.39462 17.821 2.86502 18.0607C3.3998 18.3332 4.09987 18.3332 5.5 18.3332Z"
        stroke={selected ? "url(#paint0_linear_6576_41700)" : "#344054"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6576_41700"
          x1="0.75"
          y1="18.3334"
          x2="13.25"
          y2="18.3334"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF1F71" />
          <stop offset="1" stopColor="#FF7700" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CalendarJoin;
