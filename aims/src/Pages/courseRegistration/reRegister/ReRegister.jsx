import React from 'react'

const ReRegister = () => {
  return (
    <div className="min-h-[600px] flex items-center justify-center bg-white">
      <div className="bg-gray-50 p-8 rounded shadow-md h-[50%] w-[50%] flex items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">Registration Status: </h1>
        <p className="text-gray-600">You are already registered.</p>
      </div>
    </div>
  );
}

export default ReRegister