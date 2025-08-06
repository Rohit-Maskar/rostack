import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const CheckoutButton = ({ amount }) => {
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post('http://localhost:8080/api/payment/create-order', {
        amount: amount * 100, // convert to paise
      },{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

      const { orderId } = res.data

      const options = {
        key: 'rzp_test_wypcebLuJvAudi', // Replace with your Razorpay key
        amount: amount * 100,
        currency: 'INR',
        name: 'dhisMas.com',
        description: 'Course Payment',
        order_id: orderId,
        handler: async function (response) {
           toast.success('✅ Payment Successful! ID: ' + response.razorpay_payment_id, {
            position: 'top-center',
          });
          console.log("paymentResponse "+response)
          // hit backend with payment success details if needed
          try {
    const token = localStorage.getItem('token');
    
    await axios.post(
      'http://localhost:8080/api/payment/verify',
      {
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature, // optional if you're verifying it
        email: 'rohitmaskar007@gmail.com',  // or get from logged in user
        courseName: 'Java Backend',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Optionally redirect user to Thank You page
    // navigate('/thank-you');

  } catch (error) {
    console.error('Payment verification failed:', error);
    toast.error('⚠️ Failed to record payment on server.', {
      position: 'top-center',
    });
  }
        },
        prefill: {
          name: 'Rohit Maskar',
          email: 'rohitmaskar002@gmail.com',
          contact: '9767119731',
        },
        theme: {
          color: '#3399cc',
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error(err)
     toast.error('❌ Payment failed or cancelled.', {
        position: 'top-center',
      });
    }
  }

  return (
    <button onClick={handlePayment} className="btn btn-success">
      Pay ₹{amount}
    </button>
  )
}

export default CheckoutButton
