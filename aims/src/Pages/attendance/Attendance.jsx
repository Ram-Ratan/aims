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
import StudentAttendance from "./studentAttendance.jsx/StudentAttendance";
import FacultyAttendance from "./facultyAttendance.jsx/FacultyAttendance";
import Tabs from "../../components/tabs/Tabs";
import FacultyViewAttendance from "./facultyViewAttendance/FacultyViewAttendance";

const Attendance = () => {
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
  const [selectedTab, setSelectedTab] = useState(tabs[0].tabLabel);
  const [semester, setSemester] = useState(null);
  const [branch, setBranch] = useState(null);
  const [course, setCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    getCourses({ semesterId: selectedSem?.id, branchId: selectedBranch?.id })
      .then((res) => {
        setCourse(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedSem, selectedBranch]);

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
      label: course?.name,
      value: course?.id,
      ...course,
    };
  });

  const branchOptions = branch?.map((branch) => {
    return {
      label: branch?.name,
      value: branch?.id,
      ...branch,
    };
  });

  const semOptions = semester?.map((sem) => {
    return {
      label: sem?.sem,
      value: sem?.id,
      ...sem,
    };
  });
  const handleTab = (e) => {
    setSelectedTab(e.tabLabel);
  };

  const isStudent =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))?.role === "STUDENT"
      : true;

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
            <div className="py-2">
              <h2 className="font-bold text-2xl">
                Welcome! {JSON.parse(localStorage.getItem("user"))?.name}
              </h2>
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
                      setSelectedCourse(null);
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
                      setSelectedCourse(null);
                      setSelectedBranch(e);
                    }}
                  />
                </div>
                <div className="min-w-[200px]">
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
                      console.log("clear");
                    }}
                    required
                  />
                </div>
                <div className="min-w-[200px]">
                  {isStudent ? (
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
              </div>
            </div>
          </div>

          {isStudent ? (
            <StudentAttendance
              selectedCourse={selectedCourse}
              startDate={startDate}
              endDate={endDate}
            />
          ) : (
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
                  <FacultyViewAttendance selectedCourse={selectedCourse} selectedDate={selectedDate}/>
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
