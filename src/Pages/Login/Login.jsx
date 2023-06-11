import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { loggedUser , singInGoogle} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.pathname || '/';


  const onSubmit = (data) => {
    loggedUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user)
      });
    navigate(from, { replace: true });
    reset();
  };

  const handleGoogle = () =>{
    const provider = new GoogleAuthProvider();
    singInGoogle(provider)
    .then(result => {
        const logedWithGoogle = result;
        navigate(from, {replace: true})
    })
    .catch(error=>{
        console.log(error)
        setError(error.message)
    })

}

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="pt-20">
      <div className="flex justify-center items-center h-screen ">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl text-center font-bold mb-6 text-gray-800">Log In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register('password', { required: true })}
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
                {errors.password && <span className="text-red-600">Password is required</span>}
              </div>
              <div className="flex justify-center">
                <input
                  type="submit"
                  className="px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500"
                  value="Log In"
                />
              </div>
            </form>
            <p className="mt-4 text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <Link to={'/register'}><a className="text-purple-500 hover:underline" href="">
                Register here
              </a></Link>
            </p>
            <div className="divider">OR</div>
            <div className="flex justify-center">
              <button onClick={handleGoogle} className="btn btn-circle btn-outline item hover:bg-purple-600">
                <FaGoogle></FaGoogle>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
