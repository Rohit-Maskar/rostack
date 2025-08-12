import React, { useState } from 'react'
import axios from 'axios'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../util/AxiosInstance'

const AddCoursePage = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: '',
    modules: []
  })

  const navigate = useNavigate();

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

  const removeModule = () => {
    setCourse(prev => ({
      ...prev,
      modules: prev.modules.slice(0, -1)
    }))
  }

  const removeResource = (moduleIdx) => {
    const updatedModules = [...course.modules]
    updatedModules[moduleIdx].resources = updatedModules[moduleIdx].resources.slice(0, -1)
    setCourse({ ...course, modules: updatedModules })
  }

  const [thumbnailFile, setThumbnailFile] = useState(null)

  const uploadThumbnail = async () => {
    if (!thumbnailFile) return
    const formData = new FormData()
    formData.append('file', thumbnailFile)
    formData.append('courseId', -1)

    try {
      const token = localStorage.getItem('token')
      const res = await axiosInstance.post('/courses/upload/thumbnail', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      setCourse(prev => ({ ...prev, thumbnail: res.data.url }))
      toast.success('📸 Thumbnail uploaded successfully!')
    } catch (err) {
      console.error(err)
      toast.error('❌ Thumbnail upload failed')
    }
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
      await axiosInstance.post('/courses', course, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success('✅ Course added successfully!')
      navigate('/admin/courses')
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
          <Form.Label>Course Thumbnail</Form.Label>
          <div className="d-flex align-items-center gap-3">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
            />
            <Button variant="outline-primary" onClick={uploadThumbnail} disabled={!thumbnailFile}>
              Upload
            </Button>
          </div>
          {course.thumbnail && (
            <div className="mt-2">
              <img src={course.thumbnail} alt="Thumbnail Preview" width="200" className="rounded shadow" />
            </div>
          )}
        </Form.Group>


        <div className="my-3 d-flex gap-2">
          <Button variant="outline-primary" onClick={addModule}>+ Add Module</Button>
          <Button variant="outline-danger" onClick={removeModule} disabled={course.modules.length === 0}>− Remove Module</Button>
        </div>


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

            <div className="d-flex gap-2 mb-2">
              <Button variant="outline-success" onClick={() => addResource(mIdx)}>+ Add Resource</Button>
              <Button
                variant="outline-danger"
                onClick={() => removeResource(mIdx)}
                disabled={module.resources.length === 0}
              >
                − Remove Resource
              </Button>
            </div>


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

        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={() => window.history.back()}>
            ← Back
          </Button>
          <Button variant="primary" onClick={submitCourse}>
            Save Course
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default AddCoursePage
