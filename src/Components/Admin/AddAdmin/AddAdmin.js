import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../FirebaseConfig/firebase.config';
import logo from '../../../logo.png';
import './AddAdmin.css'

const AddAdmin = () => {
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

    //Add admin
    const [newAdmin, setNewAdmin] = useState({})
    const handleBlur = (e)=> {
        if(/\S+@\S+\.\S+/.test(e.target.value)){
            let newEmail = {...newAdmin};
            newEmail[e.target.name] = e.target.value;
            setNewAdmin(newEmail)
        }
    }
    const handleSubmit = ()=>{
        fetch('https://damp-cliffs-93951.herokuapp.com/addadmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAdmin)
        })
        history.push('/');
    }
    return (
        <section className="customer">
            <div className="leftbar">
                <img onClick={()=>history.push('/')} className="customer-logo mx-auto" src={logo} alt="" />
                <div className="leftbar-navigation">
                    <div className="customer-option"><p onClick={() => history.push('/worklist')} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-briefcase"></i>Service List</p></div>
                    <div className="customer-option"><p onClick={() => history.push('/addservice')} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-plus"></i>Add Service</p></div>
                    <div className="customer-option"><p style={{ color: '#009444' }} className="customer-option-p"><i style={{ paddingRight: '8px' }} className="fas fa-user-plus"></i>Add Admin</p></div>
                </div>
            </div>
            <div className="rightbar">
                <div className="customer-title">
                    <div className="customer-page-title"><h3>Add Admin</h3></div>
                    <div className="user-name"><p onClick={handleLogOut}>{sessionStorage.getItem('name')}</p></div>
                </div>
                <div className="rightbar-content">
                    <br/>
                    <br/>
                    <div className="addAdmin-box">
                        <form action="">
                            <input onBlur={handleBlur} className="admin-input" name="email"  type="email" placeholder="jhon@gmail.com" /><br/>
                            <button onClick={handleSubmit} className="btn btn-success btn-submit" type="submit">Submit</button>
                        </form>
                    </div>
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

export default AddAdmin;