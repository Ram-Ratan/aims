import * as React from "react";
import "./Button.styles.scss";

export default function Button(props) {
  const { children, className, variant, ...restProps } = props;
  let type;
  switch (variant) {
    case "outlined": {
      type = `bg-clip-text bg-gradient-to-br text-transparent from-primaryLeft to-primaryRight outlinedBtn`;
      break;
    }
    case "filled": {
      type =
        "bg-gradient-to-br from-primaryLeft to-primaryRight text-white disable";
      break;
    }
    default: {
      type = "border border-slate-300 rounded-xl";
    }
  }
  return (
    <div>
      <button
        type="button"
        className={`items-center justify-center py-2 px-4 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed ${type} ${className} `}
        {...restProps}
      >
        {children}
      </button>
    </div>
  );
}
