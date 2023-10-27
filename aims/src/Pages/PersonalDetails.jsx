import React from 'react';

const PersonalDetails = () => {
  // Sample user data (you can load this from your database)
  const userData = {
    name: JSON.parse(localStorage.getItem("user"))?.name,
    rollNo: '20232',
    dateOfBirth: '20-02-2000',
    email: 'johndoe@example.com',
    phone: '+91 6542024510',
    address: '123 Main Street, City, Country',
    semester: '7',
    batch:"2020-24"
    // Add more personal details as needed
  };

  return (
    <div className='p-4'>
      <div className='mx-32'>
        <div className='border rounded-md h-24 shadow-md'>
            <div className='flex justify-center py-7'>
              <p className='font-bold text-2xl'>Personal Details</p>
            </div>
        </div>
      </div>
      <div className='mt-14'>
        <div className='mx-32 bg-gray-50 border rounded-md shadow-lg p-4'> 
          <div className='flex flex-col gap-2'>
              <div className='py-2'>
                <h2 className='font-bold text-2xl'><strong>Welcome, {userData.name}</strong></h2>
              </div>
              <div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p><strong>Roll No. </strong>{userData.rollNo}</p>
                      <p><strong>Semester: </strong>{userData.semester}</p>
                      <p><strong>Email: </strong>{userData.email}</p>
                    
                      <p><strong>Batch: </strong>{userData.batch}</p>
                    </div>
                    <div>
                      <p><strong>Date of Birth: </strong>{userData.dateOfBirth}</p>
                      <p><strong>Contact: </strong>{userData.phone}</p>
                      <p><strong>Address: </strong>{userData.address}</p>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
