import React from "react";
import ReactSelect from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import { customStyles } from "./selectCss";

const Select = React.forwardRef((props, ref) => {
  const { label, error, async, required, ...rest } = props;
  return (
    <React.Fragment>
      {label && (
        <label
          className={`text-sm font-medium ${
            props?.isStep1Program ? "my-0" : "my-1"
          } block text-gray-700`}
        >
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      {async ? (
        <AsyncPaginate
          ref={ref}
          styles={customStyles}
          id={props?.id}
          className={props?.className}
          {...rest}
        />
      ) : (
        <ReactSelect
          ref={ref}
          styles={customStyles}
          id={props?.id}
          {...rest}
          className={props?.className}
        />
      )}
      {error && <p className="text-red-500 text-sm -mt-.5">{error?.message}</p>}
    </React.Fragment>
  );
});

export default Select;
