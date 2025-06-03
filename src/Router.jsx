import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cart from './Pages/Cart/Cart'
import Order from './Pages/Orders/Order'
import Payment from './Pages/Payment/Payment'
import Landing from './Pages/Landing/Landing'
import Results from './Pages/Results/Result'
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Auth from './Pages/Auth/Auth'
import { CheckoutProvider, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

// 
const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_API_KEY);
// const stripePromise = loadStripe(
//   "pk_test_51RTXW0DxZ7GB60WflhPY1TYzo8NmYM0bCYOKUpNPjoUO1gmMBIwC1nRaMw6IrfFRHxt6fEMHOnz2sPKRToahpBkI00OPHuBhb1"
// );

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"You must login to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/order" element={
          <ProtectedRoute msg={"You must login to see your orders"}
          redirect={"/order"}>
            <Order />
          </ProtectedRoute>
        } />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing