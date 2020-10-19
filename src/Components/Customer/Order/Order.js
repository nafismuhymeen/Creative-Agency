import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../../logo.png';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../FirebaseConfig/firebase.config';
import './Order.css'
import { OrderContext } from '../../../App';

const Order = () => {
    const history = useHistory();
    const [orderTitle] = useContext(OrderContext);
    //Handle Admin vs Clint
    const sessionStorageEmail = sessionStorage.getItem('email')
    console.log(sessionStorageEmail);
    const [admin, setAdmin] = useState([]);
    useEffect(() => {
        fetch('https://damp-cliffs-93951.herokuapp.com/admin')
            .then(res => res.json())
            .then(data => setAdmin(data))
            .then(nothing => projectName())
    }, [])
    const adminRoute = ()=>{
        const isAdmin = admin.find(admins => admins.email === sessionStorageEmail);
        if (isAdmin) {
            history.push('/addadmin')
        }
    }
    adminRoute();   
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
    //Handle Order
    const [newOrder, setNewOrder] = useState({
        email: '',
        name: '',
        project: '',
        details: ''

    });
    const projectName = ()=>{
        if (orderTitle.name) {
            let orders = {...newOrder};
                    orders.project = orderTitle.name;
                    setNewOrder(orders);
        }
    }
    
    const handleBlur = (e) => {
        if (e.target.name === 'email') {
            let emailValidation = /\S+@\S+\.\S+/.test(e.target.value);
            if (emailValidation) {
                let orders = {...newOrder};
                orders[e.target.name] = e.target.value;
                setNewOrder(orders);
            }
        }
        let orders = {...newOrder};
        console.log(orders);
        orders[e.target.name] = e.target.value;
        setNewOrder(orders);

    }
    const handleSubmit = () => {
        fetch('https://damp-cliffs-93951.herokuapp.com/addorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder)
        })
    }
    console.log(newOrder);
    return (
        <section className="customer">
            <div className="leftbar">
                <img onClick={() => history.push('/')} className="customer-logo mx-auto" src={logo} alt="" />
                <div className="leftbar-navigation">
                    <div className="customer-option"><p style={{ color: '#009444' }} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-shopping-cart"></i>Order</p></div>
                    <div className="customer-option"><p onClick={() => history.push('/servicelist')} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-briefcase"></i>Service List</p></div>
                    <div className="customer-option"><p onClick={() => history.push('/review')} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="far fa-comment-alt"></i>Review</p></div>
                </div>
            </div>
            <div className="rightbar">
                <div className="customer-title">
                    <div className="customer-page-title"><h3>Order</h3></div>
                    <div className="user-name"><p onClick={handleLogOut}>{sessionStorage.getItem('name')}</p></div>
                </div>
                <div className="rightbar-content">
                    <form action="">
                        <input onBlur={handleBlur} name="name" className="order-input input-name" type="text" placeholder="Your Name/Company's Name" required /><br />
                        <input onBlur={handleBlur} name="email" className="order-input" type="email" placeholder="Your email address" required /><br />
                        <input onBlur={handleBlur} name="project" className="order-input" type="text" defaultValue={orderTitle.name ? orderTitle.name : null} placeholder="Project Name" required /><br />
                        <input onBlur={handleBlur} name="details" className="order-input input-details" type="text" placeholder="Project Details" required /><br />
                        <input className="order-input input-price" type="number" placeholder="Price" required />
                        <input type="file" /><br />
                        <button onClick={handleSubmit} className="btn btn-dark btn-send" type="submit">Send</button>
                    </form><br /><br />
                </div>
            </div>
        </section>
    );
};

export default Order;