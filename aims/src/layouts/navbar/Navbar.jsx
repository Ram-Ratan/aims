import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import { getUser } from '../../apiClient/user';

function Navbar() {
  const [role, setRole] = useState(null);
  const studentNav = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/about",
      label: "About",
    },
    {
      link: "/personal-details",
      label: "Personal Details",
    },
    {
      link: "/grade",
      label: "Grade",
    },
    {
      link: "/course-registration",
      label: "Course Registration",
    },
    {
      link: "/attendance",
      label: "Attendance",
    },
  ];

  const facultyNav = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/about",
      label: "About",
    },
    {
      link: "/personal-details",
      label: "Personal Details",
    },
    {
      link: "/grade",
      label: "Grade",
    },
    {
      link: "/attendance",
      label: "Attendance",
    },
  ];

  const adminNav = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/about",
      label: "About",
    },
    {
      link: "/add-user",
      label: "Add New User",
    },
    {
      link: "/course-assignment",
      label: "Course Assignment",
    },
  ];

  const defaultNav = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/about",
      label: "About",
    },
    // {
    //   link: "/add-user",
    //   label: "Add New User",
    // },
  ];
  
  useEffect(()=>{
    getUser().then((res)=>{
      setRole(res?.data?.role);
    }).catch((err)=>{
      console.log(err);
    })
  },[])


  return (
    <nav className="bg-gray-50 p-4 h-screen w-52 overflow-y-auto fixed top-14">
      <div>
        {localStorage.getItem("authToken") ? (
          <ul>
            {role === "STUDENT" && studentNav?.map((item) => {
              return (
                <li>
                  <NavLink
                    exact="true"
                    to={item.link}
                    activeClassName="active"
                    className="block text-black text-md p-2"
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
            {role === "FACULTY" && facultyNav?.map((item) => {
              return (
                <li>
                  <NavLink
                    exact="true"
                    to={item.link}
                    activeClassName="active"
                    className="block text-black text-md p-2"
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
            {role === "ADMIN" && adminNav?.map((item) => {
              return (
                <li>
                  <NavLink
                    exact="true"
                    to={item.link}
                    activeClassName="active"
                    className="block text-black text-md p-2"
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul>
            {defaultNav?.map((item) => {
              return (
                <li>
                  <NavLink
                    exact="true"
                    to={item.link}
                    activeClassName="active"
                    className="block text-black text-md p-2"
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
