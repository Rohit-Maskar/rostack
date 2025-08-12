import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const handleClick = () => {

    if (token) {
      // User is logged in, go to payment page
      navigate(`/payment/${encodeURIComponent(course.title)}`, { state: course });
    } else {
      // User is not logged in, go to enrollment form
      navigate(`/enroll/${encodeURIComponent(course.title)}`, { state: course });
    }
  };

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return (
    <Card onClick={handleClick} style={{ cursor: 'pointer' }} className="h-100 shadow-sm">
      <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
        <img
          src={`/${course.thumbnail}`}
          alt={course.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // change to "contain" if you want to see the whole image with no cropping
          }}
        />
      </div>

      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Text>{course.description}</Card.Text>
        <h5 className="text-primary">₹ {course.price}</h5>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
