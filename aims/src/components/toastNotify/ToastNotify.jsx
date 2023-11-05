import React, { useState } from "react";

const ToastNotify = (props) => {
  const [close, setClose] = useState(false);

  return (
    // <div
    //   className={`${
    //     close && "hidden"
    //   } relative w-[408px] h-full py-4 px-[30px] bg-white font-figtree gap-4 flex flex-col border border-gray-200 shadow-md rounded-lg`}
    // >
    <div className={`${close && "hidden"}`}>
      <div className="absolute top-0 left-0 w-2 h-full rounded-l-lg bg-gradient-to-b from-primaryLeft to-primaryRight"></div>
      <div className="flex flex-col gap-1 px-4">
        {/* <p className="text-sm font-semibold text-gray-900">{props.title}</p> */}
        <p className="text-sm font-bold text-gray-900 py-2">{props.message}</p>
        <p
          className="text-xs font-semibold text-gray-600 cursor-pointer"
          onClick={(e) => {
            e?.preventDefault();
            setClose(true);
            props.close();
          }}
        >
          Dismiss
        </p>
      </div>

      {/* <div className="flex gap-3 px-4"></div> */}
    </div>
    // </div>
  );
};

export default ToastNotify;
