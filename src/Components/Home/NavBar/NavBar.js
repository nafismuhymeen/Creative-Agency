import React, { useEffect, useState } from 'react';
import './NavBar.css';
import logo from '../../../logo.png'
import { useHistory } from 'react-router-dom';

const NavBar = () => {
  const history = useHistory();
  //Handle Admin vs Client
  const sessionStorageEmail = sessionStorage.getItem('email')
    console.log(sessionStorageEmail);
    const [admin, setAdmin] = useState([]);
    useEffect(() => {
        fetch('https://damp-cliffs-93951.herokuapp.com/admin')
          .then(res => res.json())
          .then(data => setAdmin(data)) 
      }, [])
      const isAdmin = admin.find(admins => admins.email === sessionStorageEmail);
      const handleDashboard = ()=>{
        if (isAdmin) {
          history.push('/addadmin')
        } else {
          history.push('/order')
        }
      }
  return (
    <nav className="navbar navbar-expand-lg navbar-light d-flex align-items-center">
      <img style={{ width: '150px', display: 'block', marginLeft: '7%' }} src={logo} alt="" />
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div style={{ marginRight: '7%'}} className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <p> Home</p>
          </li>
          <li className="nav-item">
            <p>Our Portfolio</p>
          </li>
          <li className="nav-item">
            <p>Our Team</p>
          </li>
          <li className="nav-item">
            <p style={{ paddingRight: '31px' }}>Contact Us</p>
          </li>
          <li style={sessionStorage.getItem('name') ? {display: 'initial'}:{display: 'none'}}>
            <p onClick={handleDashboard}>{sessionStorage.getItem('name')}</p>
          </li>
          <li style={sessionStorage.getItem('name') ? {display: 'none'}:{display: 'initial'}}>
            <button onClick={()=>history.push('/login')} className="btn btn-dark">Login</button>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default NavBar;