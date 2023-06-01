import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowList = () => {
    const [shows, setShows] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setShows(response.data);
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="container">
        <h1>Show List</h1>
        <ul className="list-group">
          {shows.map((show) => (
            <li key={show.show.id} className="list-group-item">
              <Link to={`/summary/${show.show.id}`}>{show.show.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ShowList;
  