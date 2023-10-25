import React from "react";
import { useSearchParams } from "react-router-dom";
// import ToolTip from "components/atoms/tooltip/Tooltip";
// import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
// import TableFilterIcon from "assets/svg/tableFilterIcon";

const AttendanceTableHeader = (props) => {
  const { name, HeaderKey, sort, helpText } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy");
  const sortType = searchParams.get("sortType");

  const onLabelClick = () => {
    if (sort) {
      if (HeaderKey === sortBy) {
        setSearchParams({
          sortType: sortType === "asc" ? "desc" : "asc",
          sortBy,
          pageSize: 10,
          pageIndex: 0,
        });
      } else {
        setSearchParams({
          sortType: "asc",
          sortBy: HeaderKey,
          pageSize: 10,
          pageIndex: 0,
        });
      }
    }
  };

  return (
    <p className="flex items-center gap-2">
      <span
        className={`${sort && "cursor-pointer"}`}
        onClick={() => onLabelClick()}
      >
        {name}
      </span>
      {helpText && (
        <span>
          {/* <ToolTip text={helpText}>
            <QuestionMarkCircleIcon className="h-4 w-4 cursor-pointer" />
          </ToolTip> */}
        </span>
      )}
      {HeaderKey === sortBy && sortType === "desc" &&
       {/* <TableFilterIcon /> */}
       }
      {HeaderKey === sortBy && sortType === "asc" && (
        {/* <TableFilterIcon className="rotate-180" /> */}
      )}
    </p>
  );
};

export default AttendanceTableHeader;
