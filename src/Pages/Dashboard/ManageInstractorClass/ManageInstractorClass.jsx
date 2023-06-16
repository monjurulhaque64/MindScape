import React from 'react';

import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import { FcFeedback } from 'react-icons/fc';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useInstructorClasses from '../../Hooks/useInstractorClass';

const ManageInstractorClass = () => {
  const [instructorClasses, refetch] = useInstructorClasses();
  const classData = instructorClasses?.data;
  


  return (
    <div className='w-full ml-4'>
      <SectionTitle heading={"Manage All Class"}></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className='bg-blue-400 rounded-lg text-white font-extrabold'>
            <tr>
              <th>#</th>
              <th>Class Photo</th>
              <th>Class Name</th>
              <th>Enroll Students</th>
              <th>Status</th>
              <th>Update</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {classData?.map((item, index) => (
              <tr key={item._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{item.name}</div>
                </td>
                <td>{item.student}</td>
                <td>{item.status}</td>
                <th>
                  <Link to={`update/${item._id}`} ><button
                    className="btn btn-outline btn-success text-2xl" >
                    <FaPen />
                  </button></Link>
                </th>
                <th>
                  <button onClick={()=>window.my_modal_1.showModal()} className="btn btn-outline btn-success text-2xl">
                    <FcFeedback />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Feedback modal */}
      
        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
    </div>
  );
};

export default ManageInstractorClass;
