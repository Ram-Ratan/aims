export const customStyles = {
  control: (base, state) => {
    const isSelectNewProgram =
      state.selectProps.id === "react-select-new-program";
    const isBudgetAllocationField =
      state.selectProps.id === "budget-allocation-field";
    return {
      ...base,
      "&:hover": {
        // borderImage: "linear-gradient(to right, #ff1f71, #ff7700) 1",
        // borderImageSlice: 1,
        // borderColor: "transparent",
        // borderRadius: "0.5rem",
      },
      boxShadow: state.isFocused ? null : null, // borderImage: state.isFocused //   ? "linear-gradient(to right, #ff1f71, #ff7700) 1" //   : "rgb(229 231 235);",
      borderImageSlice: 1,
      borderColor: state.isFocused ? "#888" : "rgb(209 213 219);",
      borderWidth: 1,
      borderRadius: "0.5rem",
      fontSize: "14px",
      color: "#667085",
      fontFamily: "Figtree", // borderBottomRightRadius: state.isFocused ? 0 : "none", // borderBottomLeftRadius: state.isFocused ? 0 : "none",
      outline: state.isFocused ? null : null,
      backgroundClip: "padding-box, border-box",
      height:
        isSelectNewProgram || isBudgetAllocationField ? "40px" : base.height,
      marginTop: isSelectNewProgram ? "0.5rem" : base.marginTop,
      width: isSelectNewProgram ? "100%" : base.width,
    };
  },
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#fffff" : "white",
    cursor: "pointer",
    fontSize: "14px",
    color: "#667085",
    fontFamily: "Figtree", // "&:hover": { backgroundColor: "#white" },
  }),

  menu: (provided, state) => {
    const isSelectNewProgram =
      state.selectProps.id === "react-select-new-program";
    return {
      ...provided,
      boxShadow:
        "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
      width: isSelectNewProgram ? "100%" : provided.width,
      zIndex: 999,
    };
  },
  menuList: (provided, state) => ({
    ...provided,
    maxHeight: "300px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "8px",
      visibility: "hidden",
    },
    "&:hover::-webkit-scrollbar": {
      visibility: "visible",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "1rem",
      visibility: "hidden",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      background: "#d0d5dd",
      visibility: "visible",
    },
  }),

  menuPortal: (provided, state) => ({
    ...provided,
    zIndex: 9999,
  }),

  indicatorSeparator: () => ({
    display: "none",
  }), // dropdownIndicator: () => ({ //   display: "none", // }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "white",
    borderRadius: "20px",
    display: "inline-flex",
    margin: "2px",
    padding: "2px",
    background:
      "linear-gradient(#fff 0 0) padding-box, linear-gradient(to right, #ff1f71, #ff7700) border-box",
    color: "black",
    border: "2px solid transparent",
    "& #react-select-hide": {
      display: "none",
    },
    "& #e-card-image": {
      height: "25px",
      width: "40px",
    },
    "& #e-card-title": {
      fontSize: "12px",
    },
    "& #e-card-description": {
      display: "none",
    },
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: "black",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    color: "black",
    paddingLeft: "4px",
    paddingRight: "4px",
    borderRadius: "50%",
    backgroundColor: "white",
    ":hover": {
      backgroundColor: "white",
    },
  }),

  singleValue: (provided) => ({
    ...provided,
    fontSize: "14px",
    color: "#667085",
    fontFamily: "Figtree",
  }),
};
