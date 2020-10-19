import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../FirebaseConfig/firebase.config';
import logo from '../../../logo.png';
import './WorkList.css';

const WorkList = () => {
    const history = useHistory();
    //Getting All Service List
    const [services, setServices] = useState([]);
    console.log(services);

    useEffect(() => {
        fetch('https://damp-cliffs-93951.herokuapp.com/order')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
       
   
    // Handle Logout 
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const handleLogOut = () => {
        firebase.auth().signOut().then(function () {
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('photo');
            history.push('/');
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <section className="customer">
            <div className="leftbar">
                <img onClick={() => history.push('/')} className="customer-logo mx-auto" src={logo} alt="" />
                <div className="leftbar-navigation">
                    <div className="customer-option"><p style={{ color: '#009444' }} onClick={() => history.push('/worklist')} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-briefcase"></i>Service List</p></div>
                    <div className="customer-option"><p className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-plus"></i>Add Service</p></div>
                    <div className="customer-option"><p onClick={() => history.push('/addadmin')} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-user-plus"></i>Add Admin</p></div>
                </div>
            </div>
            <div className="rightbar">
                <div className="customer-title">
                    <div className="customer-page-title"><h3>Service List</h3></div>
                    <div className="user-name"><p onClick={handleLogOut}>{sessionStorage.getItem('name')}</p></div>
                </div>
                <div className="rightbar-content">
                    <br />
                    <div className="table-div">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email id</th>
                                    <th>Service</th>
                                    <th>Project Details</th>
                                </tr>
                            </thead>
                            {
                                services.map(service => <tbody key={service._id}>
                                    <tr>
                                        <td>{service.name}</td>
                                        <td>{service.email}</td>
                                        <td>{service.project}</td>
                                        <td>{service.details}</td>
                                    </tr>
                                </tbody>)
                            }

                        </table>
                    </div>
                    <br />
                </div>
            </div>
        </section>
    );
};

export default WorkList;