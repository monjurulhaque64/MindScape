import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';
import GoogleLogIn from '../SocialLogin/GoogleLogIn';


const Singup = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser)
        updateUserProfile(data.name, data.photo)
          .then(() => {
            const saveUser = {name: data.name, userPhoto: data.photo , email: data.email, userRole: 'student'}
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
                  reset();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your Member on MindScape',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate('/')
                }
              })
          })
      })

  };



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="p-24 mb-10">
      <div className="flex justify-center items-center h-screen ">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl text-center font-bold mb-6 text-gray-800">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  {...register('name', { required: true })}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
                  placeholder="Enter your name"
                />
                {errors.name && <span className="text-red-600">Name is required</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  {...register('email', { required: true })}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
                  placeholder="Enter your email"
                />
                {errors.email && <span className="text-red-600">Email is required</span>}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    {...register('password', {
                      required: true,
                      minLength: 6,
                      pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/,
                    })}
                    className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                    {showPassword ? (
                      <FaEyeSlash
                        className="text-gray-400 hover:text-gray-600"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <FaEye
                        className="text-gray-400 hover:text-gray-600"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                </div>
                {errors.password?.type === 'required' && (
                  <span className="text-red-600">Password is required</span>
                )}
                {errors.password?.type === 'minLength' && (
                  <span className="text-red-600">Password should be at least 6 characters long</span>
                )}
                {errors.password?.type === 'pattern' && (
                  <span className="text-red-600">
                    Password should contain at least one capital letter, one special character, and one digit
                  </span>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    {...register('confirmPassword', {
                      required: true,
                      validate: (value) => value === watch('password'),
                    })}
                    className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                    {showPassword ? (
                      <FaEyeSlash
                        className="text-gray-400 hover:text-gray-600"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <FaEye
                        className="text-gray-400 hover:text-gray-600"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-600">Passwords do not match</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  {...register('photo', { required: true })}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
                  placeholder="Enter your Photo URL"
                />
                {errors.photo && <span className="text-red-600">Photo  is required</span>}
              </div>
              <div className="flex justify-center">
                <input
                  type="submit"
                  className="px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500"
                  value="Register"
                />
              </div>
            </form>
            <p className="mt-4 text-sm text-center text-gray-600">
              Already Have a accout?{' '}
              <Link to={'/login'}><a className="text-purple-500 hover:underline" href="">
                Login here
              </a></Link>
            </p>
            <div className="divider">OR</div>
            <div className="flex justify-center">
              <GoogleLogIn></GoogleLogIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup;