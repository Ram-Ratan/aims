import React from 'react';
import StudentProfile from './studentProfile/StudentProfile';
import FacultyProfile from './facultyProfile/FacultyProfile';

const PersonalDetails = () => {
  const isStudent =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))?.role === "STUDENT"
      : true;

  return (
    <div className='p-4'>
      <div className='mx-32'>
        <div className='border rounded-md h-24 shadow-md'>
            <div className='flex justify-center py-7'>
              <p className='font-bold text-2xl'>Personal Details</p>
            </div>
        </div>
      </div>
      {isStudent?(
        <StudentProfile/>
      ):(
        <FacultyProfile/>
      )}
      
    </div>
  );
};

export default PersonalDetails;
