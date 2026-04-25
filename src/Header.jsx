
import React from 'react'
// import { Link } from 'react-router-dom';
  const Header = () => {
    return <header style={{ backgroundColor: '#2c2a2a', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#555',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          M
        </div>
      </div>

    <button
      onClick={() => {
        window.location.href = 'https://job-prep-tracker-seven.vercel.app/';
      }}
    >
      Logout
    </button>
     <button
      onClick={() => {
        window.location.href = 'https://job-prep-tracker-seven.vercel.app/jobs';
      }}
    >
      Jobs
    </button>
    <button
      onClick={() => {
        window.location.href = 'https://job-prep-tracker-seven.vercel.app/dashboard';
      }}
    >
      Dashboard
    </button>
  </header>; 
  } 
     

export default Header;
