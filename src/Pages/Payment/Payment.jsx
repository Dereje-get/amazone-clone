import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../API/Axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket}, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe();
  const element = useElements();
  const navigate = useNavigate()

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // step1. backend ||functions...> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientsecret = response.data?.clientSecret;

      // step 2. client side(react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientsecret, {
        payment_method: {
          card: element.getElement(CardElement),
        },
      });
      console.log(paymentIntent);
      // step 3. after the confirmation...> order firestore database save, clear basket
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // empity the basket
      dispatch({ type: Type.EMPITY_BASKET });

      setProcessing(false);
      navigate("/order", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false)
    }

  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment__header}>
        checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React ln</div>
            <div>chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* product */}

        <div className={classes.flex}>
          <h3>Review item and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={classes.payment__prices}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {
                      processing? (
                        <div className={classes.loading}>
                          <ClipLoader color="gray" size={12} />
                          <p>Please wait...</p>
                        </div>
                      ):"Pay Now"
                    }
                    
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
