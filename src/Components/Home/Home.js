import React, { useContext } from 'react';
import headerLogo from './Frame.png';
import { useHistory } from 'react-router-dom';
import './Home.css';
import Slider from "react-slick";
import NavBar from './NavBar/NavBar';
import slackLogo from './slack.png';
import googleLogo from './google.png';
import uberLogo from './uber.png';
import netflixLogo from './netflix.png';
import airbnbLogo from './airbnb.png';
import carou1 from './Carousel/carousel-1.png';
import carou2 from './Carousel/carousel-2.png';
import carou4 from './Carousel/carousel-4.png';
import carou5 from './Carousel/carousel-5.png';
import altImg from './g19.png'
import { useState } from 'react';
import { useEffect } from 'react';
import { OrderContext } from '../../App';

const Home = () => {
  const history = useHistory();
  const [orderTitle, setOrderTitle] = useContext(OrderContext);
  //Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  //Loading Service Data
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('https://damp-cliffs-93951.herokuapp.com/service')
      .then(res => res.json())
      .then(data => setServices(data))
  }, [])
  //Loading Reviews
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch('https://damp-cliffs-93951.herokuapp.com/review')
      .then(res => res.json())
      .then(data => setReviews(data))
  }, [])
  //Handle Service Click
  const handleServiceClick = (service)=>{
    setOrderTitle({'name': service.title,
                   'photo': service.photo})
    history.push('/order')
  }
  return (
    <section>
      <div className="header">
        <br />
        {/* NavBar */}
        <NavBar></NavBar>
        <br />
        {/* Header */}
        <header className="home-header">
          <div className="header-description">
            <div className="description-container">
              <h1>Let's Grow Your Brand To The Next Level</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus commodo ipsum duis laoreet maecenas. Feugiat </p>
              <button className="btn btn-dark btn-hire-us">Hire Us</button>
            </div>
          </div>
          <div className="header-img">
            <img className="header-logo" src={headerLogo} alt="" />
          </div>
        </header>
      </div>
      {/* Partner Brand */}
      <section className="partner-logo">
        <img className="brand-logo" src={slackLogo} alt="" />
        <img className="brand-logo" src={googleLogo} alt="" />
        <img className="brand-logo" src={uberLogo} alt="" />
        <img className="brand-logo" src={netflixLogo} alt="" />
        <img className="brand-logo" src={airbnbLogo} alt="" />
      </section>
      {/* Service List */}
      <h1 className="service-headline">Provide awsome <span style={{ color: '#7AB259' }}>services</span></h1>
      <section className="homePage-service-list">
        {
          services.map(service => <div key={service._id} onClick={()=>handleServiceClick(service)} className="homePage-service">
            <img src={service.photo} alt={altImg} />
            <h3>{service.title}</h3>
            <p>{service.body}</p>
          </div>)
        }
      </section>
      {/* Our Work */}
      <section className="home-slider">
        <h1>Here are some of <span style={{ color: '#7AB259' }}>our works</span></h1><br /><br /><br />
        <div className="container">
          <Slider {...settings}>
            <div className="slider-component">
              <img src={carou1} alt="" />
            </div>
            <div className="slider-component">
              <img src={carou2} alt="" />
            </div>
            <div className="slider-component">
              <img src={carou4} alt="" />
            </div>
            <div className="slider-component">
              <img src={carou5} alt="" />
            </div>
          </Slider>
          <br /><br /><br />
        </div>
      </section>
      {/* Customer Review */}
      <h1 className="service-headline">Clints <span style={{ color: '#7AB259' }}>Feedback</span></h1>
      <section className="customer-reviews">
        {
          reviews.map(review=><div key={review._id} className="review-card">
          <div className="customer-review">
            <img src={review.photo} alt={altImg} />
            <div className="customer-description">
              <h5>{review.name}</h5>
              <p>{review.status}</p>
            </div>
          </div>
          <div className="review-body">
            <p style={{ padding: '0' }}>{review.body}</p>
          </div>
        </div>)
        }
      </section>
      {/* Contuct us */}
      <section className="contuct-us">
        <div className="contuct-description">
          <h1>Let us handle your project, professionally.</h1>
          <p>With well written codes, we build amazing apps for all platforms, mobile and web apps in general.</p>
        </div>
        <div className="contuct-inputs">
          <form action="">
            <input type="email" placeholder="Your email address" />
            <input type="text" placeholder="Your/Company's name" />
            <input id="input-message" type="text" placeholder="Your message" />
            <button className="btn btn-dark">Send</button>
          </form>
        </div>
      </section>
    </section>
  );
};

export default Home;