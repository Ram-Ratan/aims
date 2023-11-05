import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../../components/button/Button';
import AttendanceTableHeader from '../attendanceTable/AttendanceTableHeader';
import Select from '../../../components/select/Select';
import { getStudentByCourse, markAttendance } from '../../../apiClient/attendance';
import {toast} from "react-toastify";
import ToastNotify from '../../../components/toastNotify/ToastNotify';

const FacultyAttendance = ({ selectedCourse, selectedDate }) => {

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

  const [registeredStudent, setRegisteredStudent] = useState(null);

  const formatData = (data)=>{
    return data?.map((student)=>{
      return {
        rollNo: student?.student?.rollNo,
        name: student?.student?.fullName,
        attendance: {
          label: "A",
          value: false
        },
        ...student
      }
    })
  }

  useEffect(() => {
    getStudentByCourse({ courseId: selectedCourse?.id }).then((res)=>{
      setRegisteredStudent(formatData(res))
    }).catch((err)=>{
      setRegisteredStudent(null);
      console.log(err);
    })
  },[selectedCourse]);

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
                const updatedData = registeredStudent?.map((student) => {
                  if (student?.rollNo === row?.rollNo) {
                    return { ...student, attendance: newValue };
                  }
                  return student;
                });
                console.log('updateData',updatedData);
                setRegisteredStudent(updatedData);
              }}
              className="mx-4"
            />
          </div>
        ),
      },
    ],
    [registeredStudent]
  );

  const markAllPresent = () => {
    const updatedData = registeredStudent.map((student) => ({
      ...student,
      attendance: {
        label: "P",
        value: true,
      },
    }));
    setRegisteredStudent(updatedData);
  };

  const markAllAbsent = () => {
    const updatedData = registeredStudent.map((student) => ({
      ...student,
      attendance: {
        label: "A",
        value: false,
      },
    }));
    setRegisteredStudent(updatedData);
  };


  const handleMarkAttendance = async ()=>{
    const payload = {
      courseId: selectedCourse?.id,
      attendance: registeredStudent?.map((student)=>{
        return {
          id: student?.studentId,
          isPresent: student?.attendance?.value,
        }
      }),
      date: selectedDate
    }

    const onResponse = (message) => {
      toast(<ToastNotify message={message} close={() => {}} />, {
        onClose: () => {},
        autoCloase: 2000,
        className:
          "toast-message absolute w-full h-full py-4 px-[30px] bg-white gap-4 flex flex-col border border-gray-200 shadow-md rounded-lg",
        zIndex: 1000,
      });
    };

    await markAttendance(payload).then((res)=>{
      onResponse("hello")
    }).catch((err)=>{
      toast.error("Some error occurred")
    })
  }


  return (
    <div className='mt-10'>
      {registeredStudent && (
        <div className="grid grid-cols-1">
          <div className="overflow-x-auto">
            <div className="w-full mb-2">
              <div className="flex justify-end gap-4">
                <Button variant="outlined" onClick={markAllPresent}>
                  All Present
                </Button>
                <Button variant="outlined" onClick={markAllAbsent}>
                  All Absent
                </Button>
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
                {registeredStudent?.map((row, rowIndex) => (
                  <tr key={row.rollNo}>
                    {columns.map((column) => (
                      <td key={column.Header.props.name} className="border p-2">
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
            <Button variant="outlined" onClick={handleMarkAttendance}>
              Mark Attendance
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyAttendance