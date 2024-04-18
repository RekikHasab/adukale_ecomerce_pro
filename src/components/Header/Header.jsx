import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import classes from './Header.module.css';
import {SlLocationPin} from "react-icons/sl";
import {BsSearch} from "react-icons/bs"
import LowerHeader from "./LowerHeader";
import {BiCart} from "react-icons/bi"
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from "../../Utility/firebase"

const Header = () =>{

  const [{user, basket}, dispatch] = useContext(DataContext)
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
  }, 0)

  return(
    <section className={classes.fixed}>
    <section>
      <div className={classes.header_container}>
        
        {/* Logo section*/}
        <div className={classes.logo_container}>
          <Link to ="/">
            <img src="https://www.rekikhasab.app/images/Temp-238x78.jpg" alt="Logo" />
          </Link>

          {/* Delivery */}
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>

            <div>
            <p>Delivere to</p>
            <span>Ethiopia</span>
          </div>
        </div>
      </div>

        {/* Search */}
        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text"/>
          <BsSearch size ={25} />
        </div>

        {/* Right side link */}
        <div className={classes.order_container}>
          <a href="" className={classes.language}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/255px-Flag_of_Ethiopia.svg.png" alt=""/>

            <select name="" id="">
              <option value="">EN</option>
            </select>
          </a>

          {/* Three components */}
          <Link to = { !user && "/auth"}>
            <div>
              {
                user?(
                  <>
                   <p>Hello {user?.email?.split("@")[0]}</p>
                   <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>  
                ):(
                  <>
                  <p>Hello, Sign In</p>
                  <span>Account & Lists </span>
                  </>
                )}
            </div>
          </Link>

          {/* Orders */}
          <Link to ="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          {/* Cart */}
          <Link to ="/cart" className={classes.cart}>
            {/* Icon */}
            <BiCart size={35} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
