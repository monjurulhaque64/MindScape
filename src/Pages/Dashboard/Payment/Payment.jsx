import React from 'react';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheakOutFrom from './CheakOutFrom';
import { useLoaderData } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
    const enrollData = useLoaderData();
    console.log(enrollData)
  return (
    <div className='w-full'>
      <SectionTitle heading={'Payment'}></SectionTitle>
      <h2></h2>
      <Elements stripe={stripePromise}>
        <CheakOutFrom></CheakOutFrom>
      </Elements>
    </div>
  );
};

export default Payment;
