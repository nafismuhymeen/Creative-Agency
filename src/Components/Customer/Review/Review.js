import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../../logo.png';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../FirebaseConfig/firebase.config';
import './Review.css';
import { useEffect } from 'react';

const Review = () => {
    const history = useHistory();
    // Handle Logout
    if (firebase.apps.length===0) {
        firebase.initializeApp(firebaseConfig);
    }
    const handleLogOut = ()=>{
        firebase.auth().signOut().then(function() {
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('photo');
            history.push('/');
          }).catch(function(error) {
            // An error happened.
          });
    }
    //Adding reviews
    const [review, setReview] = useState({});
    useEffect(()=>{
        let newPhoto = {...review};
        newPhoto.photo = newPhoto.photo = sessionStorage.getItem('photo');
        setReview(newPhoto);
    },[])
    const handleBlur = (e)=>{
        let newReview = {...review}
        newReview[e.target.name] = e.target.value;
        setReview(newReview);
    }
    const handleSubmit = ()=>{
        fetch('https://damp-cliffs-93951.herokuapp.com/addreview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
    }
    return (
        <section className="customer">
            <div className="leftbar">
                <img onClick={()=>history.push('/')} className="customer-logo mx-auto" src={logo} alt="" />
                <div className="leftbar-navigation">
                    <div className="customer-option"><p onClick={()=>history.push('/order')} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-shopping-cart"></i>Order</p></div>
                    <div className="customer-option"><p onClick={()=>history.push('/servicelist')} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-briefcase"></i>Service List</p></div>
                    <div className="customer-option"><p style={{ color: '#009444' }} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="far fa-comment-alt"></i>Review</p></div>
                </div>
            </div>
            <div className="rightbar">
                <div className="customer-title">
                    <div className="customer-page-title"><h3>Review</h3></div>
                    <div className="user-name"><p onClick={handleLogOut}>{sessionStorage.getItem('name')}</p></div>
                </div>
                <div className="rightbar-content">
                <form action="">
                        <input onBlur={handleBlur} name="name" className="order-input input-name" type="text" placeholder="Your Name" required/><br/>
                        <input onBlur={handleBlur} name="status" className="order-input" type="text" placeholder="Company’s Name, Designation" required/><br/>
                        <input onBlur={handleBlur} name="body" className="order-input input-details" type="text" placeholder="Description" required/><br/>
                        <button onClick={handleSubmit} className="btn btn-dark btn-send" type="submit">Send</button>
                    </form><br/><br/><br/><br/><br/><br/><br/><br/>
                </div>
            </div>
        </section>
    );
};

export default Review;