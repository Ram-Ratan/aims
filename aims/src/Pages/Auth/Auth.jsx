import React from 'react';
import aims from '../../assets/AIMS-logo.png';
import { useNavigate } from 'react-router-dom';
import { showErrorToastMessage, showToastMessage } from '../utils/utils';
import { ToastContainer } from 'react-toastify';
import Button from '../../components/button/Button';
import { useLogIn } from '../../query/auth/auth';
import {useDispatch } from 'react-redux';
import { setToken, setUserAuthentication } from '../../store/reducers/userSlice';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSuccess = (data) => {
      if (data?.data) {
        showToastMessage("LoggedIn Successfully!");
        localStorage.setItem("authToken", JSON.stringify(data.data?.token));
        dispatch(setToken(data.data?.token));
        dispatch(setUserAuthentication(true));
        navigate("/");
      } else {
        showErrorToastMessage("Invalid Username or Password");
      }
    };
    const onError = () => {
      console.log('error')
      showErrorToastMessage("Invalid Username or Password");
    };
    const {mutate:logIn} = useLogIn({onSuccess,onError});

    const handleSubmit = async (e)=>{
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const logInPayload = {
        "email":email,
        "password": password
      }
      logIn(logInPayload);
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
              <div className='flex gap-2 items-center'>

                <div>
                  Password

                </div>
                <div className='font-normal text-xs text-blue-700 hover:cursor-pointer' onClick={()=>{navigate('/reset-password')}}>
                  Reset Password
                </div>
              </div>
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
