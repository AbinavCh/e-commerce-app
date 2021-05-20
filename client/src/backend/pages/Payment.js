import React from 'react';
//eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom';
import logo from '../../Folder/logos/amazon_PNG24.png';
import '../backend.css';

export default function Payment() {
  return (
    <div>
      <Link to='/'>
        <img
          className='logo'
          style={{ marginLeft: '42%', marginBottom: '1rem' }}
          src={logo}
          alt='amazon-logo'
        />
      </Link>
      <h6 style={{ margin: '2rem' }}>
        Payments feature is not available right. Working on it. Thank you....
      </h6>
    </div>
  );
}
