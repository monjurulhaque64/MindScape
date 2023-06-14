import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleLogIn = () => {
    const { singInGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.pathname || '/';

    const handleGoogle = () => {
        const provider = new GoogleAuthProvider();
        singInGoogle(provider)
            .then(result => {
                const logedUser = result.user;
                console.log(logedUser)
                const saveUser = {name: logedUser.displayName, userPhoto: logedUser.photoURL , email: logedUser.email, userRole: 'student'}

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers:{
                      'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                  })
                    .then(res => res.json())
                    .then(data => {
                      if (data.insertedId) {
                        navigate(from, {replace: true})
                      }
                    })

            })


    }
    return (
        <button onClick={handleGoogle} className="btn btn-circle btn-outline item hover:bg-purple-600">
            <FaGoogle></FaGoogle>
        </button>
    );
};

export default GoogleLogIn;