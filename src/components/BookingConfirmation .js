import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const location = useLocation();
  const { movieName, date, timing } = location.state;

  return (
    <div className="container">
      <h1>Ticket Booked!</h1>
      <p>Be ready with your loved ones for the movie "<b>{movieName}</b>" at "<b>{date} {timing}</b>".</p>
    </div>
  );
};

export default BookingConfirmation;
