import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Container, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../util/AxiosInstance'

const CourseListPage = () => {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axiosInstance.get('/courses', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCourses(res.data)
    } catch (err) {
      console.error(err)
      toast.error('❌ Failed to load courses')
    }
  }

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return
    try {
      const token = localStorage.getItem('token')
      await axiosInstance.delete(`/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('✅ Course deleted')
      fetchCourses()
    } catch (err) {
      console.error(err)
      toast.error('❌ Failed to delete course')
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <Container className="my-4">
      <h2>All Courses</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Creator</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id}>
              <td>{index + 1}</td>
              <td>{course.title}</td>
              <td>{course.creatorEmail}</td>
              <td>
                <Button variant="info" className="me-2" onClick={() => navigate(`/admin/courses/${course.id}/view`)}>Details</Button>
                <Button variant="warning" className="me-2" onClick={() => navigate(`/admin/courses/${course.id}/edit`)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(course.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default CourseListPage
