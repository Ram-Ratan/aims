import React from "react";
import StudentGrade from "./StudentGrade";
import FacultyGrade from "./FacultyGrade";
import { useSelector } from "react-redux";

const Grade = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      {user?.role === "STUDENT" && <StudentGrade />}
      {user?.role === "FACULTY" && <FacultyGrade />}
    </div>
  );
};

export default Grade;
