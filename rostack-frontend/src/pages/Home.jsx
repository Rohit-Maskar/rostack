import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import axios from 'axios';
import CourseCard from '../components/CourseCard';
import axiosInstance from '../util/AxiosInstance';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token')
    axiosInstance.get('/home/courses') // ✅ update with correct base URL if needed
      .then(response => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Container>
        <h2 className="text-white text-center mb-4">
          Click the course tab to grab the opportunity!!
        </h2>

        {loading ? (
          // 🔄 Show spinner if still loading
          <div className="text-center my-5">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          // ✅ Display course cards when loading is done
          <Row className="g-4">
            {courses.map((course, idx) => (
              <Col key={idx} md={4}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );

};

export default Home;
