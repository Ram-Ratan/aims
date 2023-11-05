import React, { useEffect, useState } from "react";
import { getFaculty } from "../../../apiClient/personalDetails";
import { getCourseRegisteredById } from "../../../apiClient/courseRegistration";

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  //const [courseAssigned, setCourseAssigned] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    setIsLoading(true);
    getFaculty({ userId: userId })
      .then((res) => {
        console.log(res);
        setFaculty(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  

  return (
    <div className="mt-14">
      <div className="mx-32 bg-gray-50 border rounded-md shadow-lg p-4">
        <div className="flex flex-col gap-2">
          {!isLoading ? (
            <div>
              {faculty && (
                <div>
                  <div className="py-2">
                    <h2 className="font-bold text-2xl">
                      <strong>Welcome, {faculty?.fullName}</strong>
                    </h2>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p>
                          <strong>Name: </strong> 
                          {faculty?.fullName}
                        </p>
                         
                        <p>
                          <strong>Email: </strong>
                          {faculty?.email}
                        </p>

                      
                      </div>
                      <div>
                        <p>
                          <strong>Department: </strong>
                          School of {faculty?.department}
                        </p>
                      </div>
                      {faculty.courseAssigned && (
                        <div>
                          <p className="font-bold">Course Assigned</p>
                          {faculty.courseAssigned?.map((course) => {
                            return (
                              <li className="pl-2">{course?.course?.name}</li>
                            );
                          })}
                        </div>
                      )}
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

export default FacultyProfile;
