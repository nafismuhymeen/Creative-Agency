import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../FirebaseConfig/firebase.config';
import logo from '../../logo.png';
import './Login.css';
const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    
    //Login
    if (firebase.apps.length===0) {
        firebase.initializeApp(firebaseConfig);
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    const handleLogin = ()=>{
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user;
            sessionStorage.setItem('name', user.displayName);
            sessionStorage.setItem('email', user.email);
            sessionStorage.setItem('photo', user.photoURL);
            if (from) {
                history.replace(from);
            }
            else{
                history.push('/')
            }
          }).catch(function(error) {
            var errorMessage = error.message;
            alert(errorMessage);
          });
    }

    return (
        <section className="container">
            <img onClick={()=>history.push('/')} style={{width: '150px', marginTop: '81px', display: 'block'}} className="mx-auto logo" src={logo} alt=""/>
            <div style={{height: '570px', marginTop: '43px'}} className="col-md-8 login mx-auto">
            <div className="mx-auto login__h1"><h1>Login With</h1></div>
                <div onClick={handleLogin} className="col-md-8 mx-auto google__btn">
                    <div className="my-auto mx-auto"><p>Continue With Google</p></div>
                </div>
                <p style={{fontStyle: 'normal',fontWeight: '500',fontSize: '16px',lineHeight: '20px',textAlign: 'center',paddingTop: '14px'}}>Cretae or Login to Your Account</p>
                
            </div><br/><br/><br/>
            <button onClick={()=>history.push('/')}>Home</button>
        </section>
    );
};

export default Login;