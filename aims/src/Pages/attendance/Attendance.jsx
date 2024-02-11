import React, { useEffect, useMemo, useState } from "react";
import { Input } from "../../components/input/Input";
import Select from "../../components/select/Select";
import DatePicker from "../../components/datepicker/DatePicker";
import Button from "../../components/button/Button";
import AttendanceTableHeader from "./attendanceTable/AttendanceTableHeader";
import {
  getBranch,
  getCourseRegisteredById,
  getCourses,
  getSem,
} from "../../apiClient/courseRegistration";
import StudentAttendance from "./studentAttendance.jsx/StudentAttendance";
import FacultyAttendance from "./facultyAttendance.jsx/FacultyAttendance";
import Tabs from "../../components/tabs/Tabs";
import FacultyViewAttendance from "./facultyViewAttendance/FacultyViewAttendance";
import { getClassCategory, getClassType, getCourseAssignedById } from "../../apiClient/attendance";
import { useSelector } from "react-redux";

  const tabs = [
    {
      id: 1,
      tabLabel: "Mark Attendance",
    },
    {
      id: 2,
      tabLabel: "View Attendance",
    },
  ];
const Attendance = () => {

  const [selectedTab, setSelectedTab] = useState(tabs[0].tabLabel);
  const [course, setCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [classType, setClassType] = useState([]);
  const [selectedClassType, setSelectedClassType] = useState(null);
  const [classCategory, setClassCategory] = useState([]);
  const [selectedClassCategory, setSelectedClassCategory] = useState(null);

  // const { data:user } = useGetUser();
  const user = useSelector((state) => state.user.user);


  useEffect(()=> {
    getClassType().then((res) => {
      console.log('class response',res);
      setClassType(res);
      console.log('class',classType);
    }).catch((error)=>{
      console.log(error);
    })
  },[])

  useEffect(() => {
    getClassCategory().then((res) => {
      console.log('class category response', res);
      setClassCategory(res);
    }).catch((error) => {
      console.log(error);
    })
  },[])

  useEffect(() => {
    if (user?.role === "STUDENT") {
      getCourseRegisteredById()
        .then((res) => {
          setCourse(res?.courseRegistered);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (user?.role === "FACULTY") {
      getCourseAssignedById()
        .then((res) => {
          setCourse(res?.courseAssigned);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user?.role]);


  const classTypeOptions = classType?.map((classType) => {
    return {
      label: classType,
      value: classType,
      ...classType
    }
  })

  const classCategoryOptions = classCategory?.map((classCtg) => {
    return {
      label: classCtg,
      value: classCtg,
      ...classCtg
    }
  })

  const courseOptions = course?.map((course) => {
    return {
      label: course?.course?.name,
      value: course?.courseId,
      ...course,
    };
  });

  const handleTab = (e) => {
    setSelectedTab(e.tabLabel);
  };

  const onDateChange = (event) => {
    setStartDate(event[0]);
    setEndDate(event[1]);
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
            <div>
              <div className="flex gap-4">
                <div className="min-w-[160px]">
                  <Select
                    label="Select Course"
                    className="flex flex-col"
                    options={courseOptions}
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e);
                    }}
                    isClearable
                    onClear={() => {
                      selectedCourse(null);
                    }}
                    required
                  />
                </div>
                <div className="min-w-[160px]">
                  {user?.role === "STUDENT" ? (
                    <DatePicker
                      label="Select Date Range"
                      startDate={startDate}
                      endDate={endDate}
                      // selected={selectedDate}
                      selectsRange
                      required
                      isMulti={true}
                      onChange={onDateChange}
                    />
                  ) : (
                    <DatePicker
                      label="Select Date"
                      selected={selectedDate}
                      required
                      onChange={(e) => {
                        setSelectedDate(e);
                      }}
                    />
                  )}
                </div>
                <div className="min-w-[160px]">
                  <Select
                    label="Select Class"
                    className="flex flex-col"
                    options={classTypeOptions}
                    value={selectedClassType}
                    onChange={(e) => {
                      setSelectedClassType(e);
                    }}
                    isClearable
                    onClear={() => {
                      setSelectedClassType(null);
                    }}
                    required
                  />
                </div>
                <div className="min-w-[160px]">
                  <Select
                    label="Class Category"
                    className="flex flex-col"
                    options={classCategoryOptions}
                    value={selectedClassCategory}
                    onChange={(e) => {
                      setSelectedClassCategory(e);
                    }}
                    isClearable
                    onClear={() => {
                      setSelectedClassCategory(null);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {user?.role === "STUDENT" && (
            <StudentAttendance
              selectedCourse={selectedCourse}
              startDate={startDate}
              endDate={endDate}
            />
          )}
          {user?.role === "FACULTY" && (
            <div>
              <div className="mt-4">
                <Tabs
                  tabs={tabs}
                  selectedTab={selectedTab}
                  handleTab={handleTab}
                />
              </div>
              {selectedTab === "Mark Attendance" ? (
                <FacultyAttendance
                  selectedCourse={selectedCourse}
                  selectedDate={selectedDate}
                />
              ) : (
                <div>
                  <FacultyViewAttendance
                    selectedCourse={selectedCourse}
                    selectedDate={selectedDate}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
