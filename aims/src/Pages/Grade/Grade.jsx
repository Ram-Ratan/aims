import React from "react";
import StudentGrade from "./StudentGrade";
import FacultyGrade from "./FacultyGrade";
import { useGetUser } from "../../query/user/user";

const Grade = () => {
  const { data: user } = useGetUser();
  return (
    <div>
      {user?.role === "STUDENT" && <StudentGrade />}
      {user?.role === "FACULTY" && <FacultyGrade />}
    </div>
  );
};

export default Grade;
