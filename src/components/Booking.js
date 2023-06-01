import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieName, setMovieName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    tickets: '',
    timing: ''
  });
  const [bookingDates, setBookingDates] = useState([]);

  useEffect(() => {
    const fetchMovieName = async () => {
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const data = await response.json();
      setMovieName(data.name);
    };

    fetchMovieName();
  }, [id]);

  useEffect(() => {
    const generateBookingDates = () => {
      const today = new Date();
      const nextTwoWeeks = [];
      const bookingDates = [];
  
      // Generate the next 2 weeks of dates
      for (let i = 0; i < 14; i++) {
        const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
        nextTwoWeeks.push(date);
      }
  
      // Randomly choose 7 dates from the next 2 weeks
      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * nextTwoWeeks.length);
        const randomDate = nextTwoWeeks[randomIndex];
        const dateString = randomDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
  
        // Generate random timing
        const timing = getRandomTiming();
  
        bookingDates.push({ date: dateString, timing });
        nextTwoWeeks.splice(randomIndex, 1);
      }
  
      setBookingDates(bookingDates);
    };
  
    const getRandomTiming = () => {
      const timings = ['10:00 AM', '2:00 PM', '6:00 PM', '9:00 PM'];
      const randomIndex = Math.floor(Math.random() * timings.length);
      return timings[randomIndex];
    };
  
    generateBookingDates();
  }, []);
  
  

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Store user details in local/session storage
    localStorage.setItem('userDetails', JSON.stringify(formData));
    // Navigate to BookingConfirmation page with data
    navigate('/confirmation', {
      state: {
        movieName: movieName,
        date: formData.date,
        timing: formData.timing
      }
    });
  };

  return (
    <div className="container">
      <h1>Booking Form</h1>
      <h2>Movie: {movieName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date & Timing:</label>
          <select
           id="date"
           name="date"
           value={formData.date}
           onChange={handleInputChange}
           className="form-control"
           required
                   >
         <option value="">Select Date and Timing</option>
         {bookingDates.map((bookingDate) => (
         <option key={bookingDate.date} value={bookingDate.date}>
          {bookingDate.date} - {bookingDate.timing}
         </option>
                  ))}
         </select>

        </div>
        <div className="form-group">
          <label htmlFor="tickets">Number of Tickets:</label>
          <input
            type="number"
            id="tickets"
            name="tickets"
            value={formData.tickets}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" style={{marginTop: "20px"}} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
