import React from 'react';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import { FcFeedback } from 'react-icons/fc';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useInstructorClasses from '../../Hooks/useInstractorClass';
import Modal from 'react-modal';

const ManageInstructorClass = () => {
  const [instructorClasses, refetch] = useInstructorClasses();
  const classData = instructorClasses?.data;
  
  const [selectedClass, setSelectedClass] = React.useState(null);

  const openModal = (item) => {
    setSelectedClass(item);
  };

  const closeModal = () => {
    setSelectedClass(null);
  };

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
                  <Link to={`update/${item._id}`} >
                    <button className="btn btn-outline btn-success text-2xl" >
                      <FaPen />
                    </button>
                  </Link>
                </th>
                <th>
                  <button className="btn btn-outline btn-success text-2xl" onClick={() => openModal(item)}>
                    <FcFeedback />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback modal */}
      <Modal
        isOpen={selectedClass !== null}
        onRequestClose={closeModal}
        contentLabel="Feedback Modal"
      >
        {selectedClass && (
          <div>
            <h3 className="text-xl font-bold text-center text-blue-400">{selectedClass.name}</h3>
            <p className="py-4"><span className='text-lg font-semibold text-blue-400 '>Admin FeedBack:</span> {selectedClass.feedback}</p>
            <button onClick={closeModal} className="btn">
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageInstructorClass;
