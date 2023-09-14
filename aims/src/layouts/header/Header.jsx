import React from 'react';
import aims from '../../assets/AIMS-logo.png'
import userIcon from '../../assets/user.png'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <header
      className="bg-white p-4 flex justify-between items-center h-14 sticky top-0"
      style={{
        boxShadow:
          "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
      }}
    >
      <div className="flex items-center">
        <img src={aims} alt="Logo" className="h-10 w-10 rounded-full mr-2" />
        <h1 className="text-black text-xl font-semibold">AIMS Portal</h1>
      </div>

      {/* User Avatar */}
      <div className="flex items-center gap-4 cursor-pointer">
        <div onClick={()=>{navigate('/login')}}>
          <p className='text-blue-400'>LogIn</p>
        </div>
        <img
          src={userIcon} // Replace with the actual path to your avatar image
          alt="Avatar"
          className="h-8 w-8 rounded-full" // Adjust the height, width, and rounding as needed
        />
        {/* <span className="text-black ml-2">Username</span> Replace with the user's name */}
      </div>
    </header>
  );
}

export default Header;
