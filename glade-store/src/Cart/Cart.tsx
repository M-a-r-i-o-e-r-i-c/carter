import CartItem from '../CartItem/CartItem'
//Styles
import {Wrapper} from './Cart.styles'
//Types
import { CartItemType} from '../App'

interface GladePayment {
  MID: string;
  email: string;
  firstname: string;
  lastname: string;
  description: string;
  amount: number;
  country: string;
  currency: string;
  on_success?: (response: any) => void;
  on_error?: (error: any) => void;
  on_close?: () => void;
  callback?: (response: any) => void;
  title:string
}


type Props = {
    cartItems:CartItemType[];
    addToCart:(clickedItem:CartItemType) => void;
    removeFromCart:(id:string) => void;
}



const Cart:React.FC<Props> =({cartItems, addToCart, removeFromCart}) =>{
    const calcualateTotal = (items:CartItemType[])=> items.reduce((ack:number, item)=>ack + item.amount *item.price, 0)

    const checkout = (items: {id: string, quantity: number}[]) => {
        fetch('http://localhost:3000/create-checkout-session',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                items:items
            })
        }).then(res=>{
            if(res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({url})=>{
            window.location = url
        }).catch(e =>{
            console.error(e.message)
        })
      };

      const glade = ()=>{
        const paymentData: GladePayment = {
            MID: 'GP0000001',
            email: 'hello@example.com',
            firstname: 'John',
            lastname: 'Doe',
            description: 'This is the payment for a weekly subscription',
            title: 'Weekly subscription',
            amount: 100,
            country: 'NG',
            currency: 'NGN',
            on_success: function (response) {
              console.log(response);
              alert('Payment successful!');
            },
            on_close: function () {
              console.log('Payment window closed.');
            },
            on_error: function (error) {
              console.log(error);
              alert('Payment failed.');
            },
            callback: function (response) {
              console.log(response);
            },
          };
          // Access the initializePayment function globally
    // after including the Glade API script in the HTML file
    // and pass the paymentData object to it
    // to initialize the payment process
    // Note: You should replace the anonymous function with the callback function you defined
    (window as any).initializePayment(paymentData, function (transactionReference:string) {
        console.log(transactionReference);
        alert('Payment successful!');
      });
      }

    
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0? <p>No items in cart.</p>: null}
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart}/>
            ))}
            <h2>Total:${calcualateTotal(cartItems).toFixed(2)}</h2>
            <button onClick={() => checkout(cartItems.map(item => ({id: item.id, quantity: item.amount})))} disabled={cartItems.length ===0}>Purchase Item</button>
            <button onClick={glade}>Pay with Glade</button>
        </Wrapper>
    )
}

export default Cart;