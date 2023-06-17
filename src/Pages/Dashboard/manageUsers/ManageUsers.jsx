import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const { data: users = [], refetch } = useQuery(['users'], async () => {
    const res = await fetch('https://mindscape-server.vercel.app/users');
    return res.json();
  });
  const instructor = users.filter(user => user.userRole === 'instructor');
  const admin = users.filter(user => user.userRole === 'admin');

  const handleMakeAdmin = user => {
    fetch(`https://mindscape-server.vercel.app/users/admin/${user._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          refetch()
            .then(() => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${user.name} is Admin Now!`,
                showConfirmButton: false,
                timer: 1500
              });
            })
            .catch(error => {
              console.log('Error while refetching data:', error);
            });
        }
      })
      .catch(error => {
        console.log('Error while updating user:', error);
      });
  };

  const handleMakeInstructor = user => {
    fetch(`https://mindscape-server.vercel.app/users/instructor/${user._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          refetch()
            .then(() => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${user.name} is instructor Now!`,
                showConfirmButton: false,
                timer: 1500
              });
            })
            .catch(error => {
              console.log('Error while refetching data:', error);
            });
        }
      })
      .catch(error => {
        console.log('Error while updating user:', error);
      });
  };

  const handleSearch = () => {
    refetch();
  };

  const handleSearchInputChange = e => {
    setSearchEmail(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.email && user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className='w-full'>
      <SectionTitle heading={'All users'} subHeading={'Here All MindScape Member'}></SectionTitle>
      <div className='font-bold flex justify-evenly mt-10 mb-10'>
        <h3>Total Users: {users.length}</h3>
        <h3>Total Instructors: {instructor.length}</h3>
        <h3>Total Admin: {admin.length}</h3>
      </div>
      <div className='flex justify-center mb-4'>
        <input
          type='text'
          placeholder='Search by email'
          value={searchEmail}
          onChange={handleSearchInputChange}
          className='border border-gray-400 px-4 py-2 rounded-md'
        />
        <button onClick={handleSearch} className='btn btn-primary ml-4'>
          Search
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead className='bg-blue-400 rounded-lg text-white font-extrabold'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className='flex items-center space-x-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle w-12 h-12'>
                        <img src={user.userPhoto} alt={user.name} />
                      </div>
                    </div>
                    <div>
                      <div className='font-bold'>{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.userRole}</td>
                <th>
                  {user.userRole === 'student' && (
                    <div>
                      <button onClick={() => handleMakeInstructor(user)} className='btn btn-info'>
                        Instructor
                      </button>
                      <button onClick={() => handleMakeAdmin(user)} className='btn btn-success ml-2'>
                        Admin
                      </button>
                    </div>
                  )}
                  {user.userRole === 'instructor' && (
                    <div>
                      <button className='btn btn-info' disabled>
                        Instructor
                      </button>
                      <button onClick={() => handleMakeAdmin(user)} className='btn btn-success ml-2'>
                        Admin
                      </button>
                    </div>
                  )}
                  {user.userRole === 'admin' && (
                    <div>
                      <button className='btn btn-info' disabled>
                        Instructor
                      </button>
                      <button className='btn btn-success ml-2' disabled>
                        Admin
                      </button>
                    </div>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
