import React from 'react';
import useCart from '../../Hooks/useCart';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';


const PaymentHistory = () => {
    const [cart] = useCart();
    const enrollData = cart.data;

    const paymentsData = enrollData?.filter((cartItem) => cartItem.paymentStatus === 'paid');
    const sortedPaymentsData = paymentsData?.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log(sortedPaymentsData);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString(undefined, options);
        const formattedTime = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <div className='w-full p-8'>
            <SectionTitle heading={"All Payment History"} />
            <div className='overflow-x-auto'>
                <table className='table table-zebra'>
                    {/* head */}
                    <thead className='bg-blue-400 rounded-lg text-white font-extrabold'>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Transaction Id</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPaymentsData?.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.name}</td>
                                <td>{payment.transactionId}</td>
                                <td>{formatDate(payment.date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
