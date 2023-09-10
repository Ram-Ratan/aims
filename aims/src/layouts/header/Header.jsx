import React from 'react';
import aims from '../../assets/AIMS-logo.png'
function Header() {
  return (
    <header className="bg-blue-900 p-4 flex justify-between items-center h-14 sticky top-0">
      <div className="flex items-center">
        <img
          src={aims} 
          alt="Logo"
          className="h-10 w-10 rounded-full mr-2" 
        />
        <h1 className="text-white text-xl font-semibold">AIMS Portal</h1>
      </div>

      {/* User Avatar */}
      <div className="flex items-center">
        <img
          src="/path-to-your-avatar.png" // Replace with the actual path to your avatar image
          alt="Avatar"
          className="h-8 w-8 rounded-full" // Adjust the height, width, and rounding as needed
        />
        <span className="text-white ml-2">Username</span> {/* Replace with the user's name */}
      </div>
    </header>
  );
}

export default Header;
