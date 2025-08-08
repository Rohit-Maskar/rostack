import React, { useState } from 'react'
import axios from 'axios'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'

const AddCoursePage = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: '',
    modules: []
  })

  const addModule = () => {
    setCourse(prev => ({
      ...prev,
      modules: [...prev.modules, { title: '', sequence: '', resources: [] }]
    }))
  }

  const addResource = (moduleIdx) => {
    const updatedModules = [...course.modules]
    updatedModules[moduleIdx].resources.push({ type: 'PDF', title: '', link: '', sequence: '' })
    setCourse({ ...course, modules: updatedModules })
  }

  const handleChange = (e, moduleIdx, resourceIdx, fieldType) => {
    const { name, value } = e.target
    if (moduleIdx === undefined) {
      setCourse({ ...course, [name]: value })
    } else if (resourceIdx === undefined) {
      const updatedModules = [...course.modules]
      updatedModules[moduleIdx][name] = value
      setCourse({ ...course, modules: updatedModules })
    } else {
      const updatedModules = [...course.modules]
      updatedModules[moduleIdx].resources[resourceIdx][name] = value
      setCourse({ ...course, modules: updatedModules })
    }
  }

  const submitCourse = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:8080/api/courses', course, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success('✅ Course added successfully!')
    } catch (err) {
      console.error(err)
      toast.error('❌ Failed to add course')
    }
  }

  return (
    <Container className="my-4">
      <h2>Add New Course</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={course.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" value={course.description} onChange={handleChange} as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" value={course.price} onChange={handleChange} type="number" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Thumbnail URL</Form.Label>
          <Form.Control name="thumbnail" value={course.thumbnail} onChange={handleChange} />
        </Form.Group>

        <Button variant="outline-primary" onClick={addModule}>+ Add Module</Button>

        {course.modules.map((module, mIdx) => (
          <Card key={mIdx} className="my-3 p-3">
            <Form.Group className="mb-2">
              <Form.Label>Module Title</Form.Label>
              <Form.Control value={module.title} name="title" onChange={(e) => handleChange(e, mIdx)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Sequence</Form.Label>
              <Form.Control type="number" value={module.sequence} name="sequence" onChange={(e) => handleChange(e, mIdx)} />
            </Form.Group>

            <Button variant="outline-success" onClick={() => addResource(mIdx)}>+ Add Resource</Button>

            {module.resources.map((res, rIdx) => (
              <Card key={rIdx} className="mt-2 p-2 bg-light">
                <Form.Group className="mb-2">
                  <Form.Label>Resource Type</Form.Label>
                  <Form.Select value={res.type} name="type" onChange={(e) => handleChange(e, mIdx, rIdx)}>
                    <option value="PDF">PDF</option>
                    <option value="VIDEO">Video</option>
                    <option value="YOUTUBE">YouTube</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="title" value={res.title} onChange={(e) => handleChange(e, mIdx, rIdx)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Link</Form.Label>
                  <Form.Control name="link" value={res.link} onChange={(e) => handleChange(e, mIdx, rIdx)} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Sequence</Form.Label>
                  <Form.Control type="number" name="sequence" value={res.sequence} onChange={(e) => handleChange(e, mIdx, rIdx)} />
                </Form.Group>
              </Card>
            ))}
          </Card>
        ))}

        <Button variant="primary" onClick={submitCourse}>Save Course</Button>
      </Form>
    </Container>
  )
}

export default AddCoursePage
