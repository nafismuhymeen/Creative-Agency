import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivetRoute from './Components/PrivetRoute/PrivetRoute';
import AddAdmin from './Components/Admin/AddAdmin/AddAdmin';
import AddService from './Components/Admin/AddService/AddService';
import Order from './Components/Customer/Order/Order';
import Review from './Components/Customer/Review/Review';
import ServiceList from './Components/Customer/ServiceList/ServiceList';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import { createContext } from 'react';
import WorkList from './Components/Admin/WorkList/WorkList';

export const OrderContext = createContext();
function App() {
  const [orderTitle, setOrderTitle] = useState({});
  return (
    <OrderContext.Provider value={[orderTitle, setOrderTitle]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <PrivetRoute exact path="/order">
            <Order></Order>
          </PrivetRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivetRoute exact path="/servicelist">
            <ServiceList></ServiceList>
          </PrivetRoute>
          <PrivetRoute exact path="/review">
            <Review></Review>
          </PrivetRoute>
          <PrivetRoute exact path="/addadmin">
            <AddAdmin></AddAdmin>
          </PrivetRoute>
          <PrivetRoute exact path="/addservice">
            <AddService></AddService>
          </PrivetRoute>
          <PrivetRoute exact path="/worklist">
            <WorkList></WorkList>
          </PrivetRoute>
        </Switch>
      </Router>
    </OrderContext.Provider>
  );
}

export default App;
