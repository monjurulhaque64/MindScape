import React, { useContext } from 'react';
import {useQuery} from '@tanstack/react-query'
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
    const {user} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { refetch,  data: cart =[] } = useQuery({
        queryKey: ['enrolls', user?.email],
        queryFn: async () => {
            const response = await axiosSecure(`/enrolls?email=${user?.email}`)
            return response;
        },
      })

    //   return [cart, refetch]
    //   queryKey: ['enrolls', user?.email],
    //     queryFn: async () => {
    //         const response = await fetch(`http://localhost:5000/enrolls?email=${user?.email}`, { headers: {
    //             authorization: `bearer ${token}`
    //         }})
    //         return response.json()
    //     },
    //   })
      return [cart, refetch]
};

export default useCart;