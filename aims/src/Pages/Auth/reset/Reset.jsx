import React from 'react'
import { ToastContainer } from 'react-toastify'
import Button from '../../../components/button/Button'
import aims from '../../../assets/AIMS-logo.png';
import { resetPassword } from '../../../apiClient/auth';
import { showErrorToastMessage, showToastMessage } from '../../utils/utils';

const Reset = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {email: e.target.email.value, oldPassword: e.target.oldPassword.value, newPassword: e.target.newPassword.value}
        await resetPassword(payload).then((res)=>{
          showToastMessage("Password updated Successfully!");
        }).catch((err)=>{
          console.log(err);
          showErrorToastMessage(err.message);
        })
    }

  return (
    <div>
        <div className="min-h-[630px] flex items-center justify-center bg-gray-100 overflow-hidden">
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
                htmlFor="oldPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Old Password
              </label>
             
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password
              </label>
             
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <Button
              variant = "filled"
              type="submit"
              className="w-full font-serif"
            >
              {"Change Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reset