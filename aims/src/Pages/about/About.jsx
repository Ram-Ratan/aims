import React from 'react'
import AIMSLogo from '../../assets/AIMS-logo.png'
const About = () => {
  return (
    <div className="p-4">
      <div className="mx-32">
        <div className="flex items-center py-2 gap-10 justify-center border rounded-md shadow-md">
          <div>
            <img src={AIMSLogo} alt="aims-logo" className="w-24"></img>
          </div>
          <div>
            <p className="font-bold text-3xl">AIMS IIIT UNA</p>
          </div>
        </div>
      </div>
      <div className="mx-32 pt-10">
        <div className="flex gap-4 border p-4 rounded-lg bg-gray-50 shadow-md">
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="font-bold text-2xl">Objectives</h2>
            </div>
            <div>
              <p className='pt-4'>
                The objectives of implementing the AIMS (Academic Information
                Management System) Portal in an academic institution are
                multifaceted and aim to address various challenges while
                enhancing the overall academic administrative processes. Some of
                the key objectives are:
              </p>
              <ul className="p-8 flex flex-col gap-10">
                <li className="bg-white p-4 rounded-md shadow-sm hover:bg-gray-100">
                  To automate and simplify administrative tasks such as student
                  enrollment, course registration, and grading, reducing manual
                  workload and minimizing errors.
                </li>
                <li className="bg-white p-4 rounded-md shadow-sm hover:bg-gray-100">
                  To create a centralized repository for academic information,
                  including student records, faculty data, and course schedules,
                  ensuring data accuracy and accessibility.
                </li>
                <li className="bg-white p-4 rounded-md shadow-sm hover:bg-gray-100">
                  To facilitate efficient communication among students, faculty,
                  and administrative staff through features such as
                  announcements, messaging, and notifications.
                </li>
                <li className="bg-white p-4 rounded-md shadow-sm hover:bg-gray-100">
                  To offer real-time access to critical academic data and
                  analytics, enabling administrators to make data-driven
                  decisions, monitor student progress, and optimize resource
                  allocation.
                </li>
                <li className="bg-white p-4 rounded-md shadow-sm hover:bg-gray-100">
                  {" "}
                  To create a user-friendly interface that is intuitive and easy
                  to navigate, ensuring that students, faculty, and staff can
                  use the system with minimal training.
                </li>
                <li className="bg-white p-4 rounded-md shadow-sm hover:bg-gray-100">
                  To minimize the use of paper-based processes, reducing
                  environmental impact and the costs associated with printing
                  and storing physical documents.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About