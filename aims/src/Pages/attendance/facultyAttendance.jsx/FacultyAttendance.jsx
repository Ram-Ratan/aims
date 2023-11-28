import React, { useEffect, useMemo, useState } from "react";
import Button from "../../../components/button/Button";
import AttendanceTableHeader from "../attendanceTable/AttendanceTableHeader";
import Select from "../../../components/select/Select";
import {
  getStudentByCourse,
  markAttendance,
  updateAttendance,
  viewAttendanceByCourseAndDate,
} from "../../../apiClient/attendance";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalPopup from "../../../layouts/modalPopUp/ModalPopUp";
import { showErrorToastMessage, showToastMessage } from "../../utils/utils";

const FacultyAttendance = ({ selectedCourse, selectedDate }) => {
  const attendanceOption = [
    {
      label: "P",
      value: true,
    },
    {
      label: "A",
      value: false,
    },
  ];

  const [registeredStudent, setRegisteredStudent] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const formatData = (data) => {
    return data?.map((student) => {
      return {
        rollNo: student?.student?.rollNo,
        name: student?.student?.fullName,
        attendance: {
          label: "A",
          value: false,
        },
        ...student,
      };
    });
  };

  useEffect(() => {
    getStudentByCourse({ courseId: selectedCourse?.courseId })
      .then((res) => {
        setRegisteredStudent(formatData(res));
      })
      .catch((err) => {
        setRegisteredStudent(null);
        console.log(err);
      });
  }, [selectedCourse]);

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
                console.log("updateData", updatedData);
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

  const handleMarkAttendance = async () => {
    try {
      const viewPayload = {
        courseId: selectedCourse?.courseId,
        date: selectedDate,
      };
      const res = await viewAttendanceByCourseAndDate(viewPayload);
      if (res.length) {
        setIsModal(true);
      } else {
        await markNewAttendance();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const markNewAttendance = async () => {
    const payload = {
      courseId: selectedCourse?.courseId,
      attendance: registeredStudent?.map((student) => {
        return {
          id: student?.studentId,
          isPresent: student?.attendance?.value,
        };
      }),
      date: selectedDate,
    };
    await markAttendance(payload)
      .then((res) => {
        showToastMessage("Attendance Marked Successfully!");
      })
      .catch((err) => {
        showErrorToastMessage("Attendance Failed");
      });
  };

  const handleUpdateAttendance = async () => {
    const payload = {
      courseId: selectedCourse?.courseId,
      attendance: registeredStudent?.map((student) => {
        return {
          id: student?.studentId,
          isPresent: student?.attendance?.value,
        };
      }),
      date: selectedDate,
    };
    await updateAttendance(payload)
      .then((res) => {
        showToastMessage("Attendance Updated Successfully!");
      })
      .catch((err) => {
        showErrorToastMessage("Attendance Failed");
      });
  };

  return (
    <div className="mt-10">
      <ToastContainer />
      {registeredStudent && (
        <div className="grid grid-cols-1">
          <div className="">
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

      {isModal && (
        <ModalPopup
          title="Attendance of This date is already marked. Do You want to update?"
          body={
            <div className="p-5 pt-0">
              <div className="mt-3 flex justify-center">
                <Button
                  variant="filled"
                  onClick={() => {
                    handleUpdateAttendance();
                    setIsModal(false);
                  }}
                >
                  Yes
                </Button>
              </div>
            </div>
          }
          onClose={() => setIsModal(false)}
        />
      )}
    </div>
  );
};

export default FacultyAttendance;
