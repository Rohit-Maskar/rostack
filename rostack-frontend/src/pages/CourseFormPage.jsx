// CourseFormPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../util/AxiosInstance';

const CourseFormPage = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = mode === 'edit';
  const isDetails = mode === 'details';

  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: '',
    modules: []
  });

  const [expandedModules, setExpandedModules] = useState([]);
  const [expandedResources, setExpandedResources] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get(`/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(res.data);
        setExpandedModules(res.data.modules.map(() => false));
      } catch (err) {
        toast.error('Failed to load course');
      }
    };

    fetchCourse();
  }, [id]);

  const toggleModule = (idx) => {
    setExpandedModules((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  const toggleResource = (mIdx, rIdx) => {
    const key = `${mIdx}_${rIdx}`;
    setExpandedResources((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [thumbnailFile, setThumbnailFile] = useState(null)

  const uploadThumbnail = async () => {
    if (!thumbnailFile) return
    const formData = new FormData()
    formData.append('file', thumbnailFile)
    formData.append('courseId', id)

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

  const handleChange = (e, mIdx, rIdx) => {
    const { name, value } = e.target;
    if (mIdx === undefined) {
      setCourse({ ...course, [name]: value });
    } else if (rIdx === undefined) {
      const updatedModules = [...course.modules];
      updatedModules[mIdx][name] = value;
      setCourse({ ...course, modules: updatedModules });
    } else {
      const updatedModules = [...course.modules];
      updatedModules[mIdx].resources[rIdx][name] = value;
      setCourse({ ...course, modules: updatedModules });
    }
  };

  const addModule = () => {
    setCourse((prev) => ({
      ...prev,
      modules: [...prev.modules, { title: '', sequence: '', resources: [] }],
    }));
    setExpandedModules((prev) => [...prev, true]);
  };

  const deleteModule = (mIdx) => {
    const updatedModules = [...course.modules];
    updatedModules.splice(mIdx, 1);
    setCourse({ ...course, modules: updatedModules });
    setExpandedModules((prev) => prev.filter((_, i) => i !== mIdx));
  };

  const addResource = (mIdx) => {
    const updatedModules = [...course.modules];
    updatedModules[mIdx].resources.push({ type: 'PDF', title: '', link: '', sequence: '' });
    setCourse({ ...course, modules: updatedModules });
  };

  const deleteResource = (mIdx, rIdx) => {
    const updatedModules = [...course.modules];
    updatedModules[mIdx].resources.splice(rIdx, 1);
    setCourse({ ...course, modules: updatedModules });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.put(`/courses/${id}`, course, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Course updated successfully!');
      navigate('/admin/courses');
    } catch (err) {
      toast.error('Failed to update course');
    }
  };
 
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <Container className="my-4">
      <h3>{isDetails ? 'Course Details' : 'Edit Course'}</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={course.title}
            onChange={handleChange}
            readOnly={isDetails}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={course.description}
            onChange={handleChange}
            readOnly={isDetails}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={course.price}
            onChange={handleChange}
            readOnly={isDetails}
          />
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
              <img src={`/${course.thumbnail}`} alt="Thumbnail Preview" width="200" height="200" className="rounded shadow" />
            </div>
          )}
        </Form.Group>

        {isEdit && (
          <Button variant="outline-primary" className="mb-3" onClick={addModule}>
            + Add Module
          </Button>
        )}

        {course.modules.map((mod, mIdx) => (
          <Card key={mIdx} className="mb-3">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong>Module {mIdx + 1}</strong>
              <div>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => toggleModule(mIdx)}
                  className="me-2"
                >
                  {expandedModules[mIdx] ? 'Collapse' : 'Expand'}
                </Button>
                {isEdit && (
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => deleteModule(mIdx)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </Card.Header>

            {expandedModules[mIdx] && (
              <Card.Body>
                <Form.Group className="mb-2">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={mod.title}
                    name="title"
                    onChange={(e) => handleChange(e, mIdx)}
                    readOnly={isDetails}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Sequence</Form.Label>
                  <Form.Control
                    value={mod.sequence}
                    type="number"
                    name="sequence"
                    onChange={(e) => handleChange(e, mIdx)}
                    readOnly={isDetails}
                  />
                </Form.Group>

                {isEdit && (
                  <Button
                    variant="outline-success"
                    className="mb-2"
                    onClick={() => addResource(mIdx)}
                  >
                    + Add Resource
                  </Button>
                )}

                {mod.resources.map((res, rIdx) => {
                  const key = `${mIdx}_${rIdx}`;
                  return (
                    <Card key={rIdx} className="mb-2 p-2">
                      <Row className="align-items-center">
                        <Col><strong>Resource {rIdx + 1}</strong></Col>
                        <Col className="text-end">
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => toggleResource(mIdx, rIdx)}
                            className="me-2"
                          >
                            {expandedResources[key] ? 'Collapse' : 'Expand'}
                          </Button>
                          {isEdit && (
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => deleteResource(mIdx, rIdx)}
                            >
                              Delete
                            </Button>
                          )}
                        </Col>
                      </Row>

                      {expandedResources[key] && (
                        <>
                          <Form.Group className="mt-2">
                            <Form.Label>Type</Form.Label>
                            <Form.Select
                              name="type"
                              value={res.type}
                              onChange={(e) => handleChange(e, mIdx, rIdx)}
                              disabled={isDetails}
                            >
                              <option value="PDF">PDF</option>
                              <option value="VIDEO">Video</option>
                              <option value="YOUTUBE">YouTube</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mt-2">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              name="title"
                              value={res.title}
                              onChange={(e) => handleChange(e, mIdx, rIdx)}
                              readOnly={isDetails}
                            />
                          </Form.Group>
                          <Form.Group className="mt-2">
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                              name="link"
                              value={res.link}
                              onChange={(e) => handleChange(e, mIdx, rIdx)}
                              readOnly={isDetails}
                            />
                          </Form.Group>
                          <Form.Group className="mt-2">
                            <Form.Label>Sequence</Form.Label>
                            <Form.Control
                              name="sequence"
                              type="number"
                              value={res.sequence}
                              onChange={(e) => handleChange(e, mIdx, rIdx)}
                              readOnly={isDetails}
                            />
                          </Form.Group>
                        </>
                      )}
                    </Card>
                  );
                })}
              </Card.Body>
            )}
          </Card>
        ))}

        {isEdit && (
          <Button variant="primary" onClick={handleSubmit}>
            Update Course
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default CourseFormPage;
