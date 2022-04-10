import React, {useState} from 'react'
import ImageHelper from './helper/ImageHelper';
import {Redirect} from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import {isAuthenticated} from '../auth/helper';
import { Button,  ButtonGroup, Dropdown, DropdownButton, MenuItem } from 'react-bootstrap';



const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    reload = undefined,
    setReload = f => f, // In other words, function(f) {return f}

}) => {

    const [redirect, setRedirect] = useState(false);

    const cartTitle = product ? product.name : "A Sample Product";
    const cartDescription = product ? product.description : "Description of a sample product";
    const cartPrice = product ? product.price : "Price of a sample product";
     
    const addToCart = () => {
        if (isAuthenticated()) {
            addItemToCart(product, () => {
                setRedirect(true);
            })
            console.log("Addedd to Cart");
        }
        else {
            console.log("Please Signin to add to cart");
            alert("Please Signin to add to cart");
        }
    }

    const getAredirect = redirect => {
        if (redirect) {
            return <Redirect to="/user/cart"/>
        }
    }

    // To-Do: When user click on add to cart button and not signin this should redirect to signin page
    // const getAredirectToSignin = () => {
    //     if (redirect) {
    //         return <Redirect to="/signin"/>
    //     }
    // }
    
    const showAddToCart = addToCart => {
        return (
            addtoCart && (
                <button
                onClick={addToCart}
                className="btn btn-block rounded-pill btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            )
        )
    }

    const showRemoveFromCart = removeFromCart => {
        return (
            removeFromCart && (
                <button
                onClick={ () => {
                    // To-Do: Don't forget to deal with this too
                    removeItemFromCart(product.id)
                    setReload(!reload)

                    console.log("Removed from Cart");
                }} 
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from Cart
              </button>
            )
        ) 
    }


    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
          {getAredirect(redirect)}
          <ImageHelper product={product} />
          <p className="lead bg-sucess bg-gradient font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn btn-success rounded-pill btn-sm px-3">${cartPrice}</p>
          <br />

          {/* To-Do: Implement size in backend side too. */}
          <button className="btn rounded-pill border-0 btn-block btn-outline-success mt-2 mb-2">S</button>
          <button className="btn rounded-pill border-0 btn-block btn-outline-success mt-2 mb-2">M</button>
          <button className="btn rounded-pill border-0 btn-block btn-outline-success mt-2 mb-2">L</button>
          <button className="btn rounded-pill border-0 btn-block btn-outline-success mt-2 mb-2">XL</button>
          <button className="btn rounded-pill border-0 btn-block btn-outline-success mt-2 mb-2">XXL</button>

          {/* This is testing comment */}

          {/* <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Size
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/size-s">S</Dropdown.Item>
              <Dropdown.Item href="m/size-m">M</Dropdown.Item>
              <Dropdown.Item href="#/size-l">L</Dropdown.Item>
              <Dropdown.Item href="#/size-xl">XL</Dropdown.Item>
              <Dropdown.Item href="#/size-xxl">XXL</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}

          <div className="row">
            <div className="col-12">
                {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
                {showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Card;