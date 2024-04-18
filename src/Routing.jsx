
import React from 'react'
import { Route, BrowserRouter as Router, Routes, Switch, redirect } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Orders from './Pages/Orders/Orders';
import Payment from './Pages/Payment/Payment';
import Cart from './Pages/Cart/Cart';
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Auth from './Pages/Auth/Auth';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe('pk_test_51OxB6bIlgwQ3DwuNlv4ZWibUm0OYRcoQPeuu6JhIyOxdJPNYDXgL5hv9tyRax3Gwu2JzwX37AHbhFkJ5Bjd61MRT00dsNcuau4');

function Routing() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route 
      path='/payments' 
      
      element={
        <ProtectedRoute 
        msg={"you must log in to pay"} 
        redirect={"/payments"}>

        <Elements stripe={stripePromise}>
            <Payment/>
          </Elements>
          </ProtectedRoute>
      } 
      />
      <Route path= "/orders" 
      element={
      <ProtectedRoute 
        msg={"you must log in to access your orders"} 
        redirect={"/orders"}
        >
      <Orders/>
      </ProtectedRoute>
}/>

      <Route path='/category/:categoryName' element={<Results/>} />
      <Route path='/products/:productId' element={<ProductDetail/>} />
      <Route path='/cart' element={<Cart/>} />
    </Routes>
   </Router>
  )
}

export default Routing
