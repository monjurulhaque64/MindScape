import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const CheakOutFrom = ({ enrollData }) => {
  const stripe = useStripe();
  const { user } = useContext(AuthContext);
  const elements = useElements();
  const [error, setError] = useState(null);
  const [axiosSecure] = useAxiosSecure('')
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const { _id, price, availableSeats, student, enrollClassID } = enrollData;
  const id = _id;

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price })
      .then(res => {
        setClientSecret(res.data.clientSecret)
      })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error);
    } else {
      setError(null);
    }

    setProcessing(true)

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
          },
        },
      },
    );
    if (confirmError) {
      setError(confirmError)
    }
    console.log(paymentIntent)
    setProcessing(false)
    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id)
      const paymentData = {
        date: new Date(),
        transactionId: paymentIntent.id,
        paymentStatus: 'paid'
      }
      axiosSecure.patch(`/enrolls/payment/${id}`, paymentData)
        .then((response) => {

        })
      const afterPaymentClassData = {
        availableSeats: availableSeats - 1,
        student: student + 1
      }
      axiosSecure.patch(`/classes/enroll/${enrollClassID}`, { ...afterPaymentClassData })
        .then((response) => {
          if (response.data) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your Payment succeeded!',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
      
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
        <button className='btn btn-outline btn-info mt-4 flex mx-auto' type='submit' disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>

    </>
  );
};

export default CheakOutFrom;
