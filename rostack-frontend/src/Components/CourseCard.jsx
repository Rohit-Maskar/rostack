import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const handleClick = () => {

    if (token) {
      // User is logged in, go to payment page
      navigate(`/payment/${encodeURIComponent(course.title)}`,{state: course});
    } else {
      // User is not logged in, go to enrollment form
      navigate(`/enroll/${encodeURIComponent(course.title)}`, { state: course });
    }
  };


  return (
    <Card onClick={handleClick} style={{ cursor: 'pointer' }} className="h-100 shadow-sm">
      <Card.Img variant="top"  src={`http://localhost:8080/${course.thumbnail}`} />
      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Text>{course.description}</Card.Text>
        <h5 className="text-primary">₹ {course.price}</h5>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
