import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  const callAboutPage = useCallback(async () => {
    try 
    {
      const res = await fetch('http://localhost:5000/about', 
      {
        method: 'GET',
        headers: 
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      setUserData(data);
      console.log(data);
      if (res.status === 401) 
      {
        navigate('/login');
      }
    } 
    catch (err) 
    {
      navigate('/login');
      console.log(err);
    }
  }, [navigate]);

  useEffect(() => {
    callAboutPage();
  }, [callAboutPage]);

  return (
    <div>
      <h1>About Page</h1>
      <form method="GET">
        {userData && userData.name && <h1>{userData.name}</h1>}
        {userData && userData.email && <h2>{userData.email}</h2>}
        {userData && userData.phone && <h2>{userData.phone}</h2>}
        {/* Conditional rendering for other properties */}
      </form>
    </div>
  );
};

export default About;