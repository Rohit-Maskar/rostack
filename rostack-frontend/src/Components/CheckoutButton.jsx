import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../util/AxiosInstance'

const CheckoutButton = ({ amount }) => {
  const [showThankYou, setShowThankYou] = useState(false)
  const navigate = useNavigate()
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axiosInstance.post('http://localhost:8080/api/payment/create-order', {
        amount: amount * 100, // convert to paise
      }, {
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
          console.log("paymentResponse " + response)
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
             // ✅ Show thank you popup
            setShowThankYou(true)
             // ⏳ Wait 3 seconds, then redirect to homepage
            setTimeout(() => {
              navigate('/')
            }, 5000)

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
    <>
    <button onClick={handlePayment} className="btn btn-success">
      Pay ₹{amount}
    </button>
    {showThankYou && (
        <div style={{
          position: 'fixed',
          top: '30%',
          left: '50%',
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 1000,
          boxShadow: '0px 0px 10px rgba(0,0,0,0.2)'
        }}>
          <h4 className="text-success text-center">🎉 Thank you!</h4>
          <p className="text-center">
            Your order is being placed. You will receive an email shortly with a link to access the course content.
          </p>
        </div>
      )}
      </>
  )
}

export default CheckoutButton
