import React from "react";
import { useExpanded, useTable, useRowSelect } from "react-table";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const Table = (props) => {
  const {
    data,
    columns,
    updateMyData,
    isExpandable,
    renderRowSubComponent,
    isSelectable,
    headerBackgroundColor,
    footer,
    myRow,
    ...rest
  } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    footerGroups,
  } = useTable(
    {
      data,
      columns,
      updateMyData,
    },
    isExpandable && useExpanded
    // (hooks) => {
    //   // Customize the plugin to include a selection column
    //   hooks?.visibleColumns?.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
    //       ),
    //       Cell: ({ row }) => <input type="checkbox" {...row.getToggleRowSelectedProps()} />,
    //     },
    //     ...columns,
    //   ]);
    // }
  );
  return (
    <React.Fragment>
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className={`${
                    headerBackgroundColor ? headerBackgroundColor : ""
                  }`}
                  {...column.getHeaderProps()}
                  style={{
                    minWidth: column.minWidth || "auto",
                    width: column.width || "auto",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <React.Fragment {...row.getRowProps()}>
                <tr data-myRow={myRow === i ? "myRow" : ""}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          minWidth: cell.column.minWidth || "auto",
                          width: cell.column.width || "auto",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr className="childComp">
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
        {footer && (
          <tfoot>
            {footerGroups?.map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup?.headers?.map((column) => (
                  <td {...column.getFooterProps()}>
                    {column.render("Footer")}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </table>
    </React.Fragment>
  );
};

export default Table;
