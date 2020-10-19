import React from 'react';
import { useHistory } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../FirebaseConfig/firebase.config';
import logo from '../../../logo.png';
import './AddService.css';

const AddService = () => {
    const history = useHistory();
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
                <img onClick={()=>history.push('/')} className="customer-logo mx-auto" src={logo} alt="" />
                <div className="leftbar-navigation">
                    <div className="customer-option"><p onClick={() => history.push('/worklist')} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-briefcase"></i>Service List</p></div>
                    <div className="customer-option"><p style={{ color: '#009444' }} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-plus"></i>Add Service</p></div>
                    <div className="customer-option"><p onClick={() => history.push('/addadmin')} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-user-plus"></i>Add Admin</p></div>
                </div>
            </div>
            <div className="rightbar">
                <div className="customer-title">
                    <div className="customer-page-title"><h3>Add Service</h3></div>
                    <div className="user-name"><p onClick={handleLogOut}>{sessionStorage.getItem('name')}</p></div>
                </div>
                <div className="rightbar-content">
                    <br />
                    <br />
                    <form action="">

                        <div className="addAdmin-box">

                            <input className="admin-input" type="text" placeholder="Enter Title" /><br />
                            <input className="admin-input service-description" type="text" placeholder="Enter Description" /><br/>
                            <input className="service-icon" type="file"/><br/>
                            <button className="btn btn-success btn-submit" type="submit">Submit</button>
                        </div>
                        
                    </form>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </section>
    );
};

export default AddService;