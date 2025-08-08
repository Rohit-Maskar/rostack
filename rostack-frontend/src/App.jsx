import { useState } from 'react'
import AppNavbar from './Components/AppNavbar'
import AdminNavBar from './Components/AdminNavBar'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import EnrollForm from './Components/EnrollForm'
import PaymentPage from './pages/PaymentPage'
import { ToastContainer } from 'react-toastify';
import { useAuth } from './Components/AuthContext'
import AddCoursePage from './pages/AddCoursePage';
import CourseListPage from './pages/CourseListPage';
import CourseFormPage from './pages/CourseFormPage';

function App() {
  const [count, setCount] = useState(0)
  const { role } = useAuth();

  return (
     <div className="home-background min-vh-100">
     <Router>
      <>
      {role === 'ROLE_ADMIN' ? <AdminNavBar/> : <AppNavbar />}
      </>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/enroll/:title" element={<EnrollForm/>} />
        <Route path="/payment/:title" element={<PaymentPage/>} />
        <Route path="/admin/add-course" element={<AddCoursePage/>}/>
        <Route path="/admin/courses" element={<CourseListPage />} />
        <Route path="/admin/courses/:id/edit" element={<CourseFormPage mode="edit" />} />
        <Route path="/admin/courses/:id/view" element={<CourseFormPage mode="details" />} />

      </Routes>
    </Router>
    </div>
  );
}

export default App
