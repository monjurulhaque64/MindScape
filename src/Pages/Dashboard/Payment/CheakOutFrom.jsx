import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheakOutFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error);
    } else {
      setError(null);
      console.log(paymentMethod);
    }
  };

  return (
    <>
      <form className='w-2/3 m-8' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {error && <p className='text-red-600 text-center mt-2'>{error.message}</p>}
        <button className='btn btn-outline btn-info mt-4 flex mx-auto' type='submit' disabled={!stripe}>
          Pay
        </button>
      </form>
      
    </>
  );
};

export default CheakOutFrom;
