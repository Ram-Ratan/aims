import React from "react";
import "./Tabs.styles.scss";

const Tabs = (props) => {
  const { tabs, selectedTab, handleTab, className } = props;
  return (
    <React.Fragment>
      <ul className="flex w-full text-sm text-gray-500 gap-2 items-center border-b-2 order-2">
        {tabs?.map((el) => (
          <li
            className={`cursor-pointer pb-2 px-1 ${
              selectedTab === el.tabLabel || selectedTab === el.name
                ? "bg-clip-text bg-gradient-to-br text-transparent from-primaryLeft mb-[-2px] to-primaryRight selectedTab"
                : ""
            } ${className}`}
            key={el.id}
            onClick={() => handleTab(el)}
          >
            {el.tabLabel || el.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Tabs;
