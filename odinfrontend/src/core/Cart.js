import React, {useState, useEffect} from 'react'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import PaymentB from './PaymentB'



const Cart = () => {

    const [reload, setReload] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <div>
                {products.map((product, index) => {
                    return ( //if error occures remove return
                        <Card
                            key={index}
                            product={product}
                            removeFromCart={true}
                            addtoCart={false}
                            reload={reload}
                            setReload={setReload}
                        />
                    )
                })}
            </div>
        )
    }
    
    const loadCheckout = () => {
        return (
            <div>
                <h1>Checkout</h1>
            </div>
        )
    }


  return (
    <Base title="Cart" description="Checkout Page">
        <div className="row text-center">
            <div className="col-6">
                {products.length > 0 ? (loadAllProducts(products)): (<h2>No products in the cart</h2>)}
            </div>
            <div className="col-6">
                {products.length > 0 ? 
                    (
                        <PaymentB products={products} setReload={setReload} reload={reload}/>
                    ) : 
                    (
                        <h2>Please add something in your cart</h2>
                    )
                }
            </div>
        </div>
    </Base>
  )
}

export default Cart