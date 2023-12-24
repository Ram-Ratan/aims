import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import { useSelector } from 'react-redux';

function Navbar() {
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
  
  // const { data:user } = useGetUser();
  const user = useSelector((state)=> state.user.user);
  const isAuthenticated = useSelector((state)=> state.user.isAuthenticated);


  return (
    <nav className="bg-gray-50 p-4 h-screen w-52 overflow-y-auto fixed top-14">
      <div>
        { isAuthenticated? (
          <ul>
            {user?.role === "STUDENT" && studentNav?.map((item) => {
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
            {user?.role === "FACULTY" && facultyNav?.map((item) => {
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
            {user?.role === "ADMIN" && adminNav?.map((item) => {
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
