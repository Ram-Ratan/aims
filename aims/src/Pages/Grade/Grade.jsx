import React, { useEffect, useState } from 'react'
import StudentGrade from './StudentGrade';
import FacultyGrade from './FacultyGrade';
import { getUser } from '../../apiClient/user';

const Grade = () => {
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
      <div>
        {role === "STUDENT" && <StudentGrade />}
        {role === "FACULTY" && <FacultyGrade />}
      </div>
    );
}

export default Grade