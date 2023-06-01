import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ShowSummary = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const data = await response.json();
      setSummary(data.summary);
    };

    fetchData();
  }, [id]);

  const handleBookTickets = () => {
    // Perform any necessary actions for booking the ticket
    // For demonstration purposes, let's assume the ticket booking is successful
    // Store movie details in local storage
    const movieDetails = {
      id: id,
      name: 'Movie Name', // Replace with actual movie name
      // Add any other relevant details
    };
    localStorage.setItem('movieDetails', JSON.stringify(movieDetails));

    // Navigate to the booking form page
    navigate(`/booking/${id}`);
  };

  return (
    <div className="container">
      <h1>Show Summary</h1>
      <div dangerouslySetInnerHTML={{ __html: summary }} />
      <button onClick={handleBookTickets} className="btn btn-primary">
        Book Tickets
      </button>
    </div>
  );
};

export default ShowSummary;
