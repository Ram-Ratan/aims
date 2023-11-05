import React, { useEffect, useMemo, useState } from 'react'
import AttendanceTableHeader from '../attendanceTable/AttendanceTableHeader';
import Select from '../../../components/select/Select';
import { attendanceByCourseAndDate } from '../../../apiClient/attendance';
import Button from '../../../components/button/Button';



const StudentAttendance = ({selectedCourse, startDate, endDate}) => {

  


  const [attendanceData, setAttendanceData] = useState(null);

  function formatDate(inputDateString) {
    const inputDate = new Date(inputDateString); // Parse the input date string
    const day = inputDate.getUTCDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
    const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, "0"); // Get month (months are zero-based) and pad with leading zero if necessary
    const year = inputDate.getUTCFullYear(); // Get the year
    return `${day}-${month}-${year}`; // Format the date as "dd-MM-yyyy"
  }
    const columns = useMemo(
      () => [
        {
          Header: <AttendanceTableHeader name="Serial No." HeaderKey="" />,
          accessor: "",
          Cell: ({ row, rowIndex }) => (
            <div className="">
              <p>{rowIndex + 1}</p>
            </div>
          ),
        },
        {
          Header: <AttendanceTableHeader name="Date" HeaderKey="" />,
          accessor: "date",
          Cell: ({ row }) => (
            <div className="">
              <p>{formatDate(row?.date)}</p>
            </div>
          ),
        },
        {
          Header: <AttendanceTableHeader name="Attendance" HeaderKey="" />,
          accessor: "isPresent",
          Cell: ({ row }) => (
            <div className="">
              <p>{row?.isPresent ? "P" : "A"}</p>
            </div>
          ),
        },
      ],
      [attendanceData]
    );

  

    const handleGetAttendance = async()=>{
      const payload = {
        courseId: selectedCourse?.courseId,
        startDate: startDate,
        endDate: endDate,
        userId: JSON.parse(localStorage.getItem("user"))?.id,
      };
      attendanceByCourseAndDate(payload)
        .then((res) => {
          if(res?.length)
          setAttendanceData(res);
          else setAttendanceData(null)
        })
        .catch((err) => {
          setAttendanceData(null);
          console.log(err);
        });
    }


  return (
    <div className="grid grid-cols-1">
      <div className="overflow-x-auto justify-center">
        <div className="w-full mb-2">
          <Button variant= "outlined" onClick={handleGetAttendance}>Get Attendance</Button>
        </div>
        {attendanceData?(
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
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.Header.props.name} className="border p-2">
                    {column.Cell ? column.Cell({ row,rowIndex }) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        ):(
          <div className='flex w-full justify-center mt-10'>
            <p> No attendance record found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentAttendance