import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import {cartEmpty} from './helper/cartHelper';
import {getmeToken, processPayment} from './helper/paymentHelper';
import {createOrder} from './helper/orderHelper';
import {isAuthenticated, signout} from '../auth/helper';

import DropIn from 'braintree-web-drop-in-react';


const PaymentB = (
    {products, setReload = f => f, reload = undefined}
) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
    });

    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;

    const getToken = (userId, token) => {
        getmeToken(userId, token)
            .then(info => {
                if (info.error) {
                    setInfo({...info, error: info.error});
                    signout(() => {
                        return <Redirect to="/signin" />
                    });
                } else {
                    const clientToken = info.clientToken;
                    setInfo({clientToken});
                }
            });
    }

    useEffect(() => {
        getToken(userId, token);
    } , []);

    const getAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + parseFloat(p.price);  // parseFloat is used to convert string to float
        });
        return amount;
    }

    const onPurchase = () => {
        setInfo({...info, loading: true})
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
        .then(data => {
            console.log('Data', data);
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
            .then(response => {
                console.log('Payment Response 1', response);
                if (response.error) {
                    if (response.code === '1') {
                        console.log('Payment failed');
                        signout(() => {
                            return <Redirect to="/" /> // redirected to Home Page
                        })
                    }
                } 
                else {
                    setInfo({...info, success: response.success, loading: false});
                    console.log('Payment Successful');
                    let product_names = ""
                    products.forEach(function(item){
                        product_names += item.name + ", "
                    });
                    const orderData = {
                        products: product_names,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                    }
                    createOrder(userId, token, orderData)
                    .then(response => {
                        if (response.error) {
                            if (response.code === '1') {
                                console.log('Order failed');
                                signout(() => {
                                    return <Redirect to="/" /> // redirected to Home Page
                                })
                            }
                        }
                        else {
                           if (response.success === true) {
                               console.log('Order Placed Successfully');
                           }
                        }
                    })
                    .catch(err => {
                        setInfo({loading: false, success: false})
                        console.log('Order Failed', err);
                    })
                    cartEmpty(() => {
                        console.log('Cart Emptied');
                    })
                    setReload(!reload);
                }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log("Nonce Error", err))
    }

    const showbtnDropIn = () => {
        return (
            <div>
                {
                    info.clientToken !== null && products.length > 0 ? 
                    (
                        <div>
                            <DropIn 
                            options={{authorization: info.clientToken}} 
                            onInstance={instance => (info.instance = instance)}
                            >
                            </DropIn>

                            <button 
                            onClick={onPurchase} 
                            className='btn btn-block btn-success'
                            >
                                Buy Now
                            </button>
                            
                        </div>
                    ) :
                    (
                        <h3>Please login or add something in your cart</h3>  // No products in your cart
                    )
                }
            </div>
        )
    }

    return (
        <div>
            <h3>Your bill is ${getAmount()}</h3>
            {showbtnDropIn()}
        </div>
    )
}

export default PaymentB;