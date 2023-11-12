import React, { useEffect, useState } from "react";
import Select from "../../components/select/Select";
import {
  getCourses,
  getBranch,
  getSem,
  courseRegistration,
} from "../../apiClient/courseRegistration";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { getStudent } from "../../apiClient/personalDetails";
import { CheckBoxProgram} from "../../components/input/Input";
import TickIcon from "../../assets/svg/TickIcon";

const CourseRegistration = () => {
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [sem, setSem] = useState([]);
  const [selectedSem, setSelectedSem] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses({ semesterId: selectedSem?.id, branchId: selectedBranch?.id })
      .then((res) => {
        setCourses(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedSem, selectedBranch]);

  useEffect(() => {
    getBranch()
      .then((res) => {
        setBranches(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSem()
      .then((res) => {
        setSem(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const branchOptions = branches.map((branch) => {
    return {
      label: branch?.name,
      value: branch?.id,
      ...branch,
    };
  });

  const semOptions = sem.map((sem) => {
    return {
      label: sem?.sem,
      value: sem?.id,
      ...sem,
    };
  });

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    const student = await getStudent({ userId: userId });
    console.log(selectedCourse);
    const payload = {
      studentId: student[0]?.id,
      courses: selectedCourse,
    };
    console.log(payload);
    await courseRegistration(payload)
      .then((res) => {
        navigate("/personal-details");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectCourse = (id) => {
    const newSelectedCourse = [...selectedCourse];
    const index = selectedCourse?.findIndex((ele) => ele === id);
    if (index === -1) {
      newSelectedCourse.push(id);
      setSelectedCourse(newSelectedCourse);
    } else {
      newSelectedCourse.splice(index, 1);
      setSelectedCourse(newSelectedCourse);
    }
  };

  return (
    <div className="flex w-full h-full p-4 flex-col">
      <div className="mx-32">
        <div className="border rounded-md h-24 shadow-md">
          <div className="flex justify-center py-7">
            <p className="font-bold text-2xl">Personal Details</p>
          </div>
        </div>
      </div>
      <div className="mx-32 mt-10 flex flex-col rounded-lg h-full border shadow-md px-4 py-4 gap-10 items-center justify-center">
        <div className="flex items-center justify-center gap-10">
          <div className="w-[200px] h-[100px] flex flex-col">
            <Select
              label="Select Branch"
              required
              options={branchOptions}
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e)}
            />
          </div>
          <div className="w-[200px] h-[100px] flex flex-col">
            <Select
              label="Select Semester"
              required
              options={semOptions}
              value={selectedSem}
              onChange={(e) => setSelectedSem(e)}
            />
          </div>
          {selectedBranch && selectedSem ? (
            <div className="grid grid-cols-2 h-full w-full border rounded-md shadow-md p-4 gap-4">
              {courses?.map((course) => {
                return (
                  <div
                    className="flex items-center justify-center w-[266px] h-[102px] rounded-md"
                    style={{
                      background: `${
                        selectedCourse?.includes(course?.id)
                          ? "linear-gradient(to right, #ff1f71, #ff7700)"
                          : "white"
                      }`,
                      border: `${
                        !selectedCourse?.includes(course?.id)
                          ? "solid 1px #EEEEEE"
                          : "solid 0px #EEEEEE"
                      }`,
                    }}
                  >
                    <div className="flex items-center justify-left w-[264px] h-[100px] rounded-md py-2 bg-white">
                      <CheckBoxProgram
                        item={<TickIcon />}
                        checked={selectedCourse.includes(course.id)}
                        onChange={() => {
                          handleSelectCourse(course.id);
                        }}
                      />
                      <p>{course?.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 h-full w-full border rounded-md shadow-md p-4 gap-4">
              <div className="flex items-center justify-left w-[264px] h-[100px] rounded-md py-2 bg-slate-200 animate-pulse"></div>
              <div className="flex items-center justify-left w-[264px] h-[100px] rounded-md py-2 bg-slate-200 animate-pulse"></div>
              <div className="flex items-center justify-left w-[264px] h-[100px] rounded-md py-2 bg-slate-200 animate-pulse"></div>
              <div className="flex items-center justify-left w-[264px] h-[100px] rounded-md py-2 bg-slate-200 animate-pulse"></div>
              <div className="flex items-center justify-left w-[264px] h-[100px] rounded-md py-2 bg-slate-200 animate-pulse"></div>
              <div className="flex items-center justify-left w-[264px] h-[100px] rounded-md py-2 bg-slate-200 animate-pulse"></div>
            </div>
          )}
        </div>
        {selectedCourse.length !== 0 && (
          <div>
            <Button variant="outlined" onClick = {handleSubmit}>Register</Button>
          </div>
        )}
      </div>
    </div>
    // <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
    //   <h2 className="text-2xl font-semibold mb-4">Course Registration</h2>
    //   <form onSubmit={handleSubmit}>

    //     <div className="mb-4">
    //       <Select
    //         label="Branch Name"
    //         options={branchOptions}
    //         required={true}
    //         value={selectedBranch}
    //         onChange={(e) => {
    //           setSelectedBranch(e);
    //         }}
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <Select
    //         label="semester"
    //         options={semOptions}
    //         required={true}
    //         value={selectedSem}
    //         onChange={(e) => {
    //           setSelectedSem(e);
    //           setSelectedCourse(null);
    //         }}
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <Select
    //         label="Select courses"
    //         options={courseOptions}
    //         required={true}
    //         isMulti={true}
    //         value={selectedCourse}
    //         onChange={(e) => {
    //           console.log(e);
    //           setSelectedCourse(e);
    //         }}
    //         closeMenuOnSelect={false}
    //       />
    //     </div>

    //     <div className="mt-4">
    //       <Button variant="outlined" onClick={handleSubmit}>
    //         {" "}
    //         Register
    //       </Button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default CourseRegistration;
