import React, { useContext } from 'react'
import classes from './Header.module.css'
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from './LowerHeader';
import {Link} from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from "../../Utility/firebase"

const Header = () => {
    const [{ basket, user }, dispatch] = useContext(DataContext)
    const totalItem = basket?.reduce((amount, item) => {
        return item.amount + amount
    }, 0)
  return (
    <section className={classes.fixed} >
    <section>
      <div className={classes.header__container}>
        <div className={classes.logo__container}>
            <Link to="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo"/>
            </Link>
        <div className={classes.delivery}>
                <span>
                <SlLocationPin />
                </span>    
                <div>
                    <p>Delivered to</p>
                    <span>Ethiopia</span>
                </div>
            </div>
        </div>
        <div className={classes.search}>
            <select name="" id="">
                <option value="">All</option>    
            </select>
            <input type="text" name='' id='' placeholder='search product' />
            <FaSearch />
        </div>
        <div className={classes.order__container}>
            <Link to='' className={classes.language}>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_ofthe_United_States.svg.png" alt="" />
                <select name='' id=''>
                    <option value="">EN</option>
                </select>      
            </Link>
                    <Link to={!user &&"/Auth"}>
                <div>
                    {
                    user?(<>
                            <p>Hello {user?.email?.split("@")[0]}</p>
                            <spam onClick= {()=> auth.signOut()}>Sign Out</spam>
                        </>):(
                        <>
                            <p>Hello,sign In</p>
                            <span>Account & Lists</span> 
                        </>  
                    )}
                </div>
                
            </Link>
            <Link to="/order">
                <p>Returns</p>
                <span>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
                <FaCartPlus size={38}/>
                <span>{totalItem}</span>
            </Link>
        </div>
      </div>
    </section>
    <LowerHeader/>
    </section>
  );
}

export default Header