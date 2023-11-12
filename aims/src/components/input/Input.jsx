// import TickIcon from "assets/svg/tickIcon";
import React from "react";
import TickIcon from "../../assets/svg/TickIcon";

const Input = React.forwardRef(
  (
    {
      label,
      error,
      type,
      required,
      placeholder,
      className,
      readonly,
      ...props
    },
    ref
  ) => (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id}
          className="text-sm font-medium leading-5 text-gray-700 my-1 mb-[6px]"
        >
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        className={`w-full px-[14px] py-[10px]  text-gray-500 border ${
          error ? "border-red-600" : "border-gray-300"
        } rounded-lg outline-none ${className}`}
        {...props}
        placeholder={placeholder}
        ref={ref}
        readOnly={readonly ? readonly : false}
        type={type}
      />
      {error && (
        <p className="mt-1 text-red-500 rounded text-sm">{error?.message}</p>
      )}
    </div>
  )
);
const Checkbox = React.forwardRef(
  ({ label, error, type, required, ...register }, ref) => (
    <>
      <div className="flex items-center gap-2 ">
        <input
          className={`w-4 h-4 border border-gray-300 rounded appearance-none cursor-pointer checked:bg-blue-600 checked:border-blue-600 ${
            error ? "border-red-600" : ""
          }`}
          {...register}
          ref={ref}
          type={type}
        />
        <label
          htmlFor={register.id}
          className="text-sm font-medium leading-5 text-gray-700"
        >
          {label}
        </label>
      </div>
      {error && <p className="p-2   text-red-500 rounded">{error}</p>}
    </>
  )
);
// const CheckBoxProgram = ({ label, error, value, name, onChange }) => {
const CheckBoxProgram = ({ label, error, id, checked, icon,onChange, ...rest }) => {
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onChange && onChange(e.target.checked);
  };

  return (
    <>
      <label htmlFor={id} className="ml-2 flex items-center justify-center">
        <input
          id={id}
          type="checkbox"
          className="checked:accent-primaryLeft invisible"
          checked={checked}
          onChange={handleCheckboxChange}
          {...rest}
        />
        <span
          className={`border cursor-pointer border-gray-300 h-5 w-5 rounded flex items-center justify-center ${
            checked && "bg-gradient-to-br from-primaryLeft to-primaryRight"
          }`}
        >
          {checked && (icon || <TickIcon />)}
        </span>
        <span className="px-2 text-sm text-gray-600">{label}</span>
      </label>
      {error && (
        <p className="p-2 text-red-500 rounded">{error || error?.message}</p>
      )}
    </>
  );
};

const RadioButton = React.forwardRef(
  ({ alignment, label, id, checked, ...rest }, ref) => {
    return (
      <div
        className={`flex items-center ${
          alignment ? alignment : "justify-start"
        }`}
      >
        <input
          id={id}
          type="radio"
          className="relative z-50 opacity-0 mr-1 cursor-pointer"
          ref={ref}
          {...rest}
        />
        <span
          className={`${
            checked ? "border-red-500" : "border-slate-300"
          } border h-4 w-4 flex justify-center items-center rounded-full transition absolute cursor-pointer`}
        >
          <span
            className={`${
              checked
                ? "bg-red-500 h-2 w-2 inline-block rounded-full transition-all"
                : ""
            } `}
          ></span>
        </span>
        <label
          htmlFor={id}
          className="text-sm px-1 text-gray-600 flex gap-2 cursor-pointer items-center"
        >
          {label}
        </label>
      </div>
    );
  }
);

export { Input, Checkbox, CheckBoxProgram, RadioButton };
