import React from 'react'
import Layouts from './layouts/Layouts';
import { Route, Routes} from "react-router-dom";
import About from "./Pages/about/About";
import Grade from "./Pages/Grade/Grade"; 
import PersonalDetails from './Pages/personalDetails/PersonalDetails';
import Home from './Pages/home/Home';
import CourseRegistration from './Pages/courseRegistration/CourseRegistration';
import Auth from './Pages/Auth/Auth';
import Attendance from './Pages/attendance/Attendance';
//import Placement from './Pages/Placement';

const AppRoutes = () => {
  return (
    <Layouts>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/grade" element={<Grade />} />
        <Route path="/course-registration" element={<CourseRegistration />} />
        <Route path='/attendance' element={<Attendance />} />
        {/* <Route path='placement' element={<Placement />} /> */}
        {/* Add more routes for other pages */}
      </Routes>
    </Layouts>
  );
}

export default AppRoutes;