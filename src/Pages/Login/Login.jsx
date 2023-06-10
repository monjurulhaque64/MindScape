import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    return (
        <div className="pt-20">
            <div className="flex justify-center items-center h-screen ">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl text-center font-bold mb-6 text-gray-800">Log In</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                required
                                id="email"
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                required
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button className="px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500">
                                Login
                            </button>
                        </div>
                        <p className="mt-4 text-sm text-center text-gray-600">
                            Don't have an account?{' '}
                            <a className="text-purple-500 hover:underline" href="/register">
                                Register here
                            </a>
                        </p>
                        <div className="divider">OR</div>
                        <div className='flex justify-center'>
                            <button className="btn btn-circle btn-outline item hover:bg-purple-600">
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
