import React, { useEffect, useState } from 'react';
import StudentProfile from './studentProfile/StudentProfile';
import FacultyProfile from './facultyProfile/FacultyProfile';
import {getUser} from "../../apiClient/user";

const PersonalDetails = () => {
  const [role, setRole] = useState(null);
       useEffect(() => {
         getUser()
           .then((res) => {
             setRole(res?.data?.role);
           })
           .catch((err) => {
             console.log(err);
           });
       }, []);

  return (
    <div className="p-4">
      <div className="mx-32">
        <div className="border rounded-md h-24 shadow-md">
          <div className="flex justify-center py-7">
            <p className="font-bold text-2xl">Personal Details</p>
          </div>
        </div>
      </div>
      {role === "STUDENT" && <StudentProfile />}
      {role === "FACULTY" && <FacultyProfile />}
      {role === "ADMIN" && <FacultyProfile />}
    </div>
  );
};

export default PersonalDetails;
