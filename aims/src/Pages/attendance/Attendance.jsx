import React, { useEffect, useMemo, useState } from "react";
import { Input } from "../../components/input/Input";
import Select from "../../components/select/Select";
import DatePicker from "../../components/datepicker/DatePicker";
import Button from "../../components/button/Button";
import AttendanceTableHeader from "./attendanceTable/AttendanceTableHeader";
import {
  getBranch,
  getCourses,
  getSem,
} from "../../apiClient/courseRegistration";

const Attendance = () => {
  const [semester, setSemester] = useState(null);
  const [branch, setBranch] = useState(null);
  const [course, setCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const initialData = [
    {
      rollNo: 20232,
      name: "Prithvi Singh Bhati",
      attendance: {
        label: "P",
        value: true,
      },
    },
    {
      rollNo: 20234,
      name: "Priyankjeet Pradhan",
      attendance: {
        label: "A",
        value: false,
      },
    },
    {
      rollNo: 20235,
      name: "Ram Ratan",
      attendance: {
        label: "P",
        value: true,
      },
    },
    {
      rollNo: 20236,
      name: "Rohit kumar Gupta",
      attendance: {
        label: "A",
        value: false,
      },
    },
  ];

  useEffect(() => {
    getCourses({ semId: selectedSem?._id })
      .then((res) => {
        setCourse(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedSem]);

  useEffect(() => {
    getBranch()
      .then((res) => {
        setBranch(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSem()
      .then((res) => {
        setSemester(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const courseOptions = course?.map((course) => {
    return {
      label: course?.courseName,
      value: course?.courseCode,
      ...course,
    };
  });

  const branchOptions = branch?.map((branch) => {
    return {
      label: branch?.name,
      value: branch?.code,
      ...branch,
    };
  });

  const semOptions = semester?.map((sem) => {
    return {
      label: sem?.name,
      value: sem?.code,
      ...sem,
    };
  });

  const attendanceOption = [
    {
      label: "P",
      value: true,
    },
    {
      label: "A",
      value: true,
    },
  ];

  const [data, setData] = useState(initialData);
  const disabled = localStorage.getItem("user")!== "undefined"?!JSON.parse(localStorage.getItem("user"))?.isFaculty: true;

  const columns = useMemo(
    () => [
      {
        Header: <AttendanceTableHeader name="Roll No." HeaderKey="" />,
        accessor: "rollNo",
      },
      {
        Header: <AttendanceTableHeader name="Name" HeaderKey="" />,
        accessor: "name",
      },
      {
        Header: <AttendanceTableHeader name="Attendance" HeaderKey="" />,
        accessor: "attendance",
        Cell: ({ row }) => (
          <div className="">
            <Select
              options={attendanceOption}
              value={row.attendance}
              onChange={(e) => {
                const newValue = e;
                const updatedData = data.map((student) => {
                  if (student.rollNo === row.rollNo) {
                    return { ...student, attendance: newValue };
                  }
                  return student;
                });
                setData(updatedData);
              }}
              isDisabled = {disabled}
              className="mx-4"
            />
          </div>
        ),
      },
    ],
    [data]
  );


  const markAllPresent = () => {
    const updatedData = data.map((student) => ({
      ...student,
      attendance: {
        label: "P",
        value: true
      },
    }));
    setData(updatedData);
  };

  const markAllAbsent = () => {
    const updatedData = data.map((student) => ({
      ...student,
      attendance: {
        label: "A",
        value: false,
      },
    }));
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
                <div className="min-w-[200px]">
                  <Select
                    label="Select Semester"
                    className="flex flex-col"
                    options={semOptions}
                    value={selectedSem}
                    required
                    onChange={(e) => {
                      setSelectedSem(e);
                    }}
                  />
                </div>
                <div className="min-w-[200px]">
                  <Select
                    label="Select Branch"
                    className="flex flex-col"
                    options={branchOptions}
                    value={selectedBranch}
                    required
                    onChange={(e) => {
                      setSelectedBranch(e);
                    }}
                  />
                </div>
                <div className="min-w-[200px]">
                  <Select
                    label="Select Course"
                    className="flex flex-col"
                    options={courseOptions}
                    isMulti
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e);
                    }}
                    closeMenuOnSelect={false}
                    required
                  />
                </div>
                <div className="min-w-[200px]">
                  <DatePicker
                    label="Select Date"
                    selected={selectedDate}
                    required
                    onChange={(e) => {
                      setSelectedDate(e);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="overflow-x-auto">
              <div className="w-full mb-2">
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outlined"
                    onClick={markAllPresent}
                    disabled={
                      disabled
                    }
                  >
                    All Present
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={markAllAbsent}
                    disabled={
                      disabled
                    }
                  >
                    All Absent
                  </Button>
                  {/* <button
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
                  </button> */}
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
            <div className="mt-10">
              <Button
                variant="outlined"
                disabled={disabled}
              >
                Mark Attendance
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
