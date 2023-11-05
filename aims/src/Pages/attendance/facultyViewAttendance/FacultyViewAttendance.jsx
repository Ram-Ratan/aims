import React, { useEffect, useMemo, useState } from 'react'
import AttendanceTableHeader from '../attendanceTable/AttendanceTableHeader';
import { viewAttendanceByCourseAndDate } from '../../../apiClient/attendance';

const FacultyViewAttendance = ({ selectedCourse, selectedDate }) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatData = (data)=>{
    return data?.map((attendance)=>{
        return {
            "rollNo": attendance?.student?.rollNo,
            "name": attendance?.student?.fullName,
            "attendance": attendance?.isPresent
        }
    })
  }

  useEffect(() => {
    const payload = {
      courseId: selectedCourse?.id,
      date: selectedDate,
    };
    setIsLoading(true);
    viewAttendanceByCourseAndDate(payload)
      .then((res) => {
        setAttendanceData(formatData(res));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [selectedCourse, selectedDate]);

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
        Cell: ({ row }) => <div className="">
            {row?.attendance?"P":"A"}
        </div>,
      },
    ],
    [attendanceData]
  );
  return (
    <div className="mt-10">
      {console.log(attendanceData)}
      {!isLoading && (
        <div>
          {attendanceData?.length ? (
            <div className="grid grid-cols-1">
              <div className="overflow-x-auto">
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
                    {attendanceData?.map((row, rowIndex) => (
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
          ) : (
            <div className="flex w-full justify-center mt-10">
              <p> No attendance record found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FacultyViewAttendance