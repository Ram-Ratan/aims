import React, { useEffect, useState } from 'react';
import StudentProfile from './studentProfile/StudentProfile';
import FacultyProfile from './facultyProfile/FacultyProfile';
import { useGetUser } from '../../query/user/user';

const PersonalDetails = () => {
  const { data:user } = useGetUser();

  return (
    <div className="p-4">
      <div className="mx-32">
        <div className="border rounded-md h-24 shadow-md">
          <div className="flex justify-center py-7">
            <p className="font-bold text-2xl">Personal Details</p>
          </div>
        </div>
      </div>
      {user?.role === "STUDENT" && <StudentProfile />}
      {user?.role === "FACULTY" && <FacultyProfile />}
      {user?.role === "ADMIN" && <FacultyProfile />}
    </div>
  );
};

export default PersonalDetails;
