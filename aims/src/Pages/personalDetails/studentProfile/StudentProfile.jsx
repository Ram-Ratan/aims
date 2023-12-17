import React, { useEffect, useState } from "react";
import { getStudent } from "../../../apiClient/personalDetails";
import { useGetPersonalDetails } from "../../../query/personalDetails/personalDetails";

const StudentProfile = () => {
  // const [student, setStudent] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getStudent()
  //     .then((res) => {
  //       setStudent(res);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // }, []);

  const { isLoading, data: student } = useGetPersonalDetails("STUDENT");


  return (
    <div className="mt-14">
      <div className="mx-32 bg-gray-50 border rounded-md shadow-lg p-4">
        <div className="flex flex-col gap-2">
          {!isLoading ? (
            <div>
              {student && (
                <div>
                  <div className="py-2">
                    <h2 className="font-bold text-2xl">
                      <strong>Welcome, {student?.fullName}</strong>
                    </h2>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p>
                          <strong>Roll No. </strong>
                          {student?.rollNo}
                        </p>
                        <p>
                          <strong>Semester: </strong>
                          {student?.semester?.sem}
                        </p>
                        <p>
                          <strong>Email: </strong>
                          {student?.email}
                        </p>

                        <p>
                          <strong>Branch: </strong>
                          {student?.branch?.name}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Contact: </strong>
                          {student?.mobileNo}
                        </p>
                      </div>
                        <div>
                          Course Registered
                          {student?.courseRegistered?.map((course) => {
                            return (
                              <li className="pl-2">{course?.course?.name}</li>
                            );
                          })}
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>Please wait while your information is loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
