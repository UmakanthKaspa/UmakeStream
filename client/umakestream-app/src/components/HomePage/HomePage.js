import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jwtToken = Cookies.get('jwt_token')
      const response = await fetch('http://localhost:5000/api/now_playing', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Home Page</h2>
      <p>{message}</p>
    </div>
  );
};

export default Home;
