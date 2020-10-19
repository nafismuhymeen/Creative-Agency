import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../../logo.png';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../FirebaseConfig/firebase.config';
import icon from './g19.png';
import './ServiceList.css';

const ServiceList = () => {
    const history = useHistory();
    //Handle Logout
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
    //Loading my service
    const email = sessionStorage.getItem('email');
    const [myService, setMyService] = useState([]);
    useEffect(() => {
        fetch(`https://damp-cliffs-93951.herokuapp.com/myservice?email=${email}`)
            .then(res => res.json())
            .then(data => setMyService(data))
    }, [])
    return (
        <section className="customer">
            <div className="leftbar">
                <img onClick={() => history.push('/')} className="customer-logo mx-auto" src={logo} alt="" />
                <div className="leftbar-navigation">
                    <div className="customer-option"><p onClick={() => history.push('/order')} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-shopping-cart"></i>Order</p></div>
                    <div className="customer-option"><p style={{ color: '#009444' }} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-briefcase"></i>Service List</p></div>
                    <div className="customer-option"><p onClick={() => history.push('/review')} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="far fa-comment-alt"></i>Review</p></div>
                </div>
            </div>
            <div className="rightbar">
                <div className="customer-title">
                    <div className="customer-page-title"><h3>Service List</h3></div>
                    <div className="user-name"><p onClick={handleLogOut}>{sessionStorage.getItem('name')}</p></div>
                </div>
                <div className="rightbar-content">
                    <div className="service-container">
                        {
                            myService.map(service => <div key={service._id}className="selected-service mx-auto">
                                <div className="selected-service-title">
                                    <img className="service-icon" src={icon} alt="" />
                                    <div className="work-status"><p>Pending</p></div>
                                </div>
                                <div className="service-description">
                                    <h3>{service.project}</h3>
                                    <p>{service.details}</p>
                                </div>
                            </div>)
                        }


                        <br />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceList;