import React, { useContext, useState, useEffect } from 'react'
import LayOut from '../../components/LayOut/LayOut'
import classes from "./Orders.module.css"
import { db } from '../../Utility/firebase'
import { DataContext } from '../../components/DataProvider/DataProvider'
import ProductCard from '../../components/Product/ProductCard'

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot)
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });

      return () => unsubscribe(); // Unsubscribe from snapshot listener when component unmounts
    } else {
      setOrders([]);
    }
  }, [user]); // Add user to the dependency array

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && <div style={{padding: "20px"}}>
              You don't have orders yet!
              </div>}

          {/***Ordered items */}
          <div>
            {orders.map((eachOrder) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>
                {eachOrder.data.basket.map((order) => ( // Fixed map function syntax
                  <ProductCard
                    flex={true}
                    product={order}
                    key={order.id}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
