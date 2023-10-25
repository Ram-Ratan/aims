import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  
  return (
    <nav className="bg-gray-50 p-4 h-screen w-52 overflow-y-auto fixed top-14">
      <div>
        <ul>
          <li>
            <NavLink
              exact="true"
              to="/"
              activeClassName="active"
              className="block text-black text-md p-2"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              exact="true"
              to="/about"
              activeClassName="active"
              className="block text-md text-black p-2"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              exact="true"
              to="/personal-details"
              activeClassName="active"
              className="block text-md text-black p-2"
            >
              Personal Details
            </NavLink>
          </li>
          <li>
            <NavLink
              exact="true"
              to="/grade"
              activeClassName="active"
              className="block text-md text-black p-2"
            >
              Grade
            </NavLink>
          </li>
          <li>
            <NavLink
              exact="true"
              to="/course-registration"
              activeClassName="active"
              className="block text-md text-black p-2"
            >
              Course Registration
            </NavLink>
          </li>
          <li>
            <NavLink
              exact="true"
              to="/attendance"
              activeClassName="active"
              className="block text-md text-black p-2"
            >
              Attendance
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
