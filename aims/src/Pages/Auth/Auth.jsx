import React from 'react';
import aims from '../../assets/AIMS-logo.png';
import { logIn } from '../../apiClient/auth';
import { useNavigate } from 'react-router-dom';
import { showErrorToastMessage, showToastMessage } from '../utils/utils';
import { ToastContainer } from 'react-toastify';
import Button from '../../components/button/Button';

const Auth = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const logInPayload = {
        "email":email,
        "password": password
      }
      
      await logIn(logInPayload)
        .then((res) => {
          if (res?.data) {
            localStorage.setItem("authToken", JSON.stringify(res.data?.token));
            navigate("/");
            window.location.reload();
            showToastMessage("LoggedIn Successfully!");
          } else {
            showErrorToastMessage("Invalid Username or Password");
          }
        })
        .catch((err) => {
          showErrorToastMessage("Invalid Username or Password");
        });
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        <ToastContainer />

        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <img src={aims} alt="logo" className="h-10 w-10 mx-auto mb-6" />
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
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

            <Button
              variant = "filled"
              type="submit"
              className="w-full"
            >
              {"Log in"}
            </Button>
          </form>
        </div>
      </div>
    );
};

export default Auth;
