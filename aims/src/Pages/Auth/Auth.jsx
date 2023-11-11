import React, { useEffect, useState } from 'react';
import aims from '../../assets/AIMS-logo.png';
import { logIn, signUP } from '../../apiClient/auth';
import { useNavigate } from 'react-router-dom';
import { showErrorToastMessage, showToastMessage } from '../utils/utils';
import { ToastContainer } from 'react-toastify';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [selectedRole, setSelectedRole] = useState('student'); // Initialize with 'student'
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
      setSelectedRole(e.target.value);
    };
  

    const handleSubmit = async (e)=>{
      e.preventDefault();
      const email = e.target.email.value;
      const name = e.target?.name?.value;
      const role = e.target?.role?.value;
      const password = e.target.password.value;
      const logInPayload = {
        "username":email,
        "password": password
      }
      // const payload = {
      //   ...logInPayload,
      //   ...(name ? { name: name } : {}),
      //   ...(role
      //     ? {
      //         isAdmin: role === "admin",
      //         isStudent: role === "student",
      //         isFaculty: role === "faculty",
      //       }
      //     : {}),
      // };
      isSignUp? await signUP(logInPayload).then((res)=>{
        navigate('/')
        window.location.reload();
      }): await logIn(logInPayload).then((res)=>{
        console.log('res',res)
        if(res?.data){
          localStorage.setItem("user", JSON.stringify(res?.data));
          navigate("/");
          window.location.reload();
          showToastMessage("LoggedIn Successfully!");
        }else{
          showErrorToastMessage("Invalid Username or Password");
        }
      }).catch((err)=>{
        showErrorToastMessage("Invalid Username or Password")
      })
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <ToastContainer />

        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <img src={aims} alt="logo" className="h-10 w-10 mx-auto mb-6" />

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {/* Dropdown input for selecting role */}
            {isSignUp && (
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                  value={selectedRole}
                  onChange={handleRoleChange}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
            )}

            {isSignUp && (
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Display Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
             
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {isSignUp ? "Sign up" : "Log in"}
            </button>
            <div className="flex justify-center pt-4">
              {isSignUp ? (
                <div className="flex gap-2">
                  <p>Have an account!</p>
                  <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
                    <p className="font bold text-blue-400">LogIn</p>
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <p>Don't have an account</p>
                  <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
                    <p className="font bold text-blue-400">Sign Up</p>
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
};

export default Auth;
