import React, { useMemo } from 'react'
import { Input } from '../../components/input/Input'
import Select from '../../components/select/Select'
import DatePicker from '../../components/datepicker/DatePicker';
import Table from '../../components/table/Table';
import AttendanceTableHeader from './attendanceTable/AttendanceTableHeader';

const Attendance = () => {
  const data = [
    {
      rollNo: 1,
      attendance: "A",
    },
    {
      rollNo: 2,
      attendance: "A",
    },
    {
      rollNo: 3,
      attendance: "A",
    },
    {
      rollNo: 4,
      attendance: "A",
    },
  ];
  const columns = useMemo(
    () => [
      {
        id: 1,
        Header: (
          <AttendanceTableHeader name={"Student Roll No"} HeaderKey={""} />
        ),
        Cell: ({ row }) => (
          <span className="flex flex-col gap-0.5">
            <p className="text-gray-900 text-sm font-medium">
              {row.original.rollNo}
            </p>
          </span>
        ),
      },
      {
        id: 2,
        Header: <AttendanceTableHeader name={"Attendance"} HeaderKey={""} />,
        Cell: ({ row }) => (
          <span className="flex flex-col gap-0.5">
            <p className="text-gray-900 text-sm font-medium">
              {row.original.attendance}
            </p>
          </span>
        ),
      },
    ],
    []
  );
  return (
    <div className="p-4">
      <div className="mx-32">
        <div className="flex items-center py-2 gap-10 justify-center border rounded-md shadow-md">
          <div className="py-4">
            <p className="font-bold text-3xl">Attendance section</p>
          </div>
        </div>
      </div>
      <div className="mx-32 pt-10">
        <div className="flex flex-col gap-4 border p-4 rounded-lg bg-gray-50 shadow-md">
          <div className="flex flex-col gap-2">
            <div className="py-2">
              <h2 className="font-bold text-2xl">Welcome! Name</h2>
            </div>
            <div>
              <div className="flex gap-4">
                <div className="">
                  <Select label="Select Course" className="flex flex-col"/>
                </div>
                <div>
                  <DatePicker label="Select Date" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full h-full bg-white border border-gray-300 rounded-lg p-10">
            <React.Fragment>
              <Table
                data={data}
                columns={columns}
              />
            </React.Fragment>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance