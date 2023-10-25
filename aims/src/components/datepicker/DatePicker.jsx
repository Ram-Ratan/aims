import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarAnniversary from "../../assets/svg/calendarJoin";
import "./DatePicker.styles.scss";

const DatePicker = React.forwardRef((props, parentRef) => {
  const { label, required, disabled, error } = props;
  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <div
        className={`rounded-lg text-sm text-gray-500 bg-white w-full px-6 py-2.5 border border-gray-300 flex items-center gap-2.5 ${
          disabled && "!bg-gray-100"
        } ${error ? "border-red-600" : "border-gray-300"}`}
        onClick={onClick}
        ref={ref}
      >
        <CalendarAnniversary className="text-gray-500" />
        {value ? value : <span className="text-gray-400">Select date</span>}
      </div>
    );
  });

  return (
    <React.Fragment>
      {label && (
        <label className={`text-sm my-1 block text-gray-700 font-medium`}>
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <ReactDatePicker
        disabled={disabled}
        ref={parentRef}
        dropdownMode="select"
        showMonthDropdown
        showYearDropdown
        customInput={<CustomInput />}
        {...props}
      />
      {error && <p className="p-2 text-red-500 rounded">{error?.message}</p>}
    </React.Fragment>
  );
});

export default DatePicker;
