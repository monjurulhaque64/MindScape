import React, { useContext } from 'react';
import {useQuery} from '@tanstack/react-query'
import { AuthContext } from '../../Provider/AuthProvider';

const useCart = () => {
    const {user} = useContext(AuthContext);

    const { refetch,  data: cart =[] } = useQuery({
        queryKey: ['enrolls', user?.email],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/enrolls?email=${user?.email}`)
            return response.json()
        },
      })
      return [cart, refetch]
};

export default useCart;