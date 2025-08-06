import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AppNavbar from './Components/AppNavbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import EnrollForm from './Components/EnrollForm'
import PaymentPage from './pages/PaymentPage'
import { ToastContainer } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  return (
     <div className="home-background min-vh-100">
     <Router>
      <AppNavbar />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/enroll/:title" element={<EnrollForm/>} />
        <Route path="/payment" element={<PaymentPage/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App
