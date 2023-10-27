
import React, { useMemo, useState } from 'react';
import { Input } from '../../components/input/Input';
import Select from '../../components/select/Select';
import DatePicker from '../../components/datepicker/DatePicker';
import AttendanceTableHeader from './attendanceTable/AttendanceTableHeader';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const initialData = [
    {
      rollNo: 1,
      name: 'John Doe',
      attendance: 'A',
    },
    {
      rollNo: 2,
      name: 'Jane Smith',
      attendance: 'A',
    },
    {
      rollNo: 3,
      name: 'Bob Johnson',
      attendance: 'P',
    },
    {
      rollNo: 4,
      name: 'Alice Brown',
      attendance: 'A',
    },
  ];

  const [data, setData] = useState(initialData);

  const columns = useMemo(
    () => [
      {
        Header: (
          <AttendanceTableHeader name="Roll No." HeaderKey="" />
        ),
        accessor: 'rollNo',
      },
      {
        Header: <AttendanceTableHeader name="Name" HeaderKey="" />,
        accessor: 'name',
      },
      {
        Header: <AttendanceTableHeader name="Attendance" HeaderKey=""/>,
        accessor: 'attendance',
        Cell: ({ row }) => (
          <select
            value={row.attendance}
            onChange={(e) => {
              const newValue = e.target.value;
              const updatedData = data.map(student => {
                if (student.rollNo === row.rollNo) {
                  return { ...student, attendance: newValue };
                }
                return student;
              });
              setData(updatedData);
            }}
          >
            <option value="A">A</option>
            <option value="P">P</option>
          </select>
        ),
      },
    ],
    [data]
  );

  const markAllPresent = () => {
    const updatedData = data.map(student => ({ ...student, attendance: 'P' }));
    setData(updatedData);
  };

  const markAllAbsent = () => {
    const updatedData = data.map(student => ({ ...student, attendance: 'A' }));
    setData(updatedData);
  };

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
                <div className='w-[200px]'>
                  <Select label="Select Semester" className="flex flex-col" />
                </div>
                <div className='w-[200px]'>
                  <Select label="Select Branch" className="flex flex-col" />
                </div>
                <div className='w-[200px]'>
                  <Select label="Select Course" className="flex flex-col" />
                </div>
                <div className='w-[200px]'>
                  <DatePicker label="Select Date" selected={selectedDate} onChange={(e)=>{setSelectedDate(e)}}/>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="overflow-x-auto">
              <div className="w-fullmb-1">
                <div className="flex justify-end mr-3">
                  <button
                    onClick={markAllPresent}
                    className="border px-2 py-1 bg-gray-300 rounded-2xl text-xs"
                  >
                    All Present
                  </button>
                  <button
                    onClick={markAllAbsent}
                    className="border px-2 py-1 bg-gray-300 rounded-2xl text-xs"
                  >
                    All Absent
                  </button>
                </div>
              </div>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.Header.props.name}
                        className="bg-gray-200 border text-left p-2"
                      >
                        {column.Header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={row.rollNo}>
                      {columns.map((column) => (
                        <td
                          key={column.Header.props.name}
                          className="border p-2"
                        >
                          {column.Cell
                            ? column.Cell({ row })
                            : row[column.accessor]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
