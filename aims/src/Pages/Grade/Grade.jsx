import React from 'react'
import StudentGrade from './StudentGrade';
import FacultyGrade from './FacultyGrade';

const Grade = () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    const isStudent = JSON.parse(localStorage.getItem("user"))?.role === "STUDENT";
    return (
        <div>
            {isStudent ? <StudentGrade /> : <FacultyGrade />}
        </div>
    )
}

export default Grade