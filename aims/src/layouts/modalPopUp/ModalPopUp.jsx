// import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

const ModalPopup = ({
  onClose,
  onCallBack,
  modalType,
  title,
  body,
  bodyText,
  height,
  width,
}) => {
  return (
    <div className="fixed z-[53] inset-0 bg-[rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-center min-h-screen px-4 w-full">
        <div
          className={`bg-white rounded-lg shadow-md relative   pb-4 ${
            width ? width : "w-[600px] max-w-[600px]"
          }`}
        >
          <div className="flex justify-between p-4 font-semibold">
            <p className="items-center">{title}</p>
            <button
              className="flex justify-end items-end top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <p className="w-5 h-5">X</p>
              {/* <XMarkIcon /> */}
            </button>
          </div>
          <div
            className={`${
              height ? `max-h-[${height}]` : "max-h-[400px]"
            } overflow-y-auto custom-scrollbar`}
          >
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
