const TickIcon = ({ width, height, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 10}
    height={height || 7}
    className={className}
    fill="none"
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M8.333 1.5 3.75 6.083 1.667 4"
    />
  </svg>
);
export default TickIcon;
