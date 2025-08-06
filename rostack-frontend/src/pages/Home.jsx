import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CourseCard from '../components/CourseCard';

const dummyCourses = [
  {
    title: 'Java Backend',
    description: 'Learn Spring Boot, APIs, Hibernate',
    thumbnail: 'https://via.placeholder.com/300x180',
    price: 1999
  },
  {
    title: 'React Frontend',
    description: 'Build interactive UIs with React',
    thumbnail: 'https://via.placeholder.com/300x180',
    price: 1499
  },
  {
    title: 'DevOps',
    description: 'CI/CD pipelines, Docker, K8s',
    thumbnail: 'https://via.placeholder.com/300x180',
    price: 2499
  }
];

const Home = () => {
  return (
    <div>
      <Container>
        <h2 className="text-white text-center mb-4">Click the course tab to grab the opportunity!!</h2>
        <Row className="g-4">
          {dummyCourses.map((course, idx) => (
            <Col key={idx} md={4}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
