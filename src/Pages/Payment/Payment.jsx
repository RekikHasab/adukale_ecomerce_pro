import React, { useContext, useState} from 'react';
import classes from "./Payment.module.css";
import LayOut from '../../components/LayOut/LayOut';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  console.log(user)
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount
  }, 0);
  const total = basket.reduce((amount, item)=>{
    return item.price * item.amount + amount;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const handleChange = (e)=>{
    console.log(e);
    e?.error?.message? setCardError(e?.error?.message):setCardError("")
  };

  const handlePayment = async(e) =>{
    e.preventDefault()

    try{
      setProcessing(true);
      
      //Step1: Backend || functions -->Contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      console.log(response.data)
      const clientSecret = response.data?.clientSecret;

       //Step2: Client Side (react side confirmation)
       const {paymentIntent} = await stripe.confirmCardPayment(
        clientSecret,{
          payment_method:{
            card: elements.getElement(CardElement)
          },
        });
       //console.log(paymentIntent)

       //step3: after the confirmation ---> order firestore database save, clear basket 
       await db
       .collection("users")
       .doc(user.uid)
       .collection("orders")
       .doc(paymentIntent.id)
       .set({
        basket:basket,
        amount:paymentIntent.amount,
        created: paymentIntent.created,
       });

       //Empty the basket
       dispatch({type: Type.EMPTY_BASKET});

    setProcessing(false);
    navigate("/orders", {state:{msg: "You have placed new Order..."}});

    }catch(error){
      console.log(error)
      setProcessing(false)
    }
    
  };

  return (
    <LayOut>
      {/**Header*/}
      <div className={classes.payment_header}>
        Checkout({totalItem}) items
      </div>

      {/***Payment method */}
      <section className={classes.payement}>
        {/***address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
                <div>{user?.email}</div>
                <div>Mizan Aman</div>
                <div>Mizan, SWE</div>
          </div>
        </div>
        <hr />

        {/***product */}
        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/***card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payement_card_container}>
            <div className={classes.payement_details}>
              <form onSubmit ={handlePayment}>
                {/***Error */}
                {cardError && (
                <small style={{color:"red"}}>{cardError}</small>
                )}

                {/***Card Element */}
                <CardElement onChange={handleChange}/>

                {/**Price */}
                <div className={classes.payement_price}>
                  <div>
                    <span style={{display: "flex", gap: "10px"}}>
                     <p> Total Order |</p><CurrencyFormat amount={total}/>
                    </span>
                  </div>
                  <button type="submit">
                    {
                      processing?(
                        <div className={classes.loading}>
                          <ClipLoader color='gray' size={12}/>
                          <p>Please Wait...</p>
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
    </LayOut>
  );
}

export default Payment;
