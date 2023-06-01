import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowSummary from './components/ShowSummary';
import Booking from './components/Booking';
import BookingConfirmation from './components/BookingConfirmation ';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/confirmation" element={<BookingConfirmation />} />
        <Route path="/" element={<ShowList />} />
        <Route path="/summary/:id" element={<ShowSummary />} />
      </Routes>
    </Router>
  );
};

export default App;
