// sk_test_51MqqBdHAGNRbz6trmqTq8GRlwjBpXTyy5qpjHKOZamBQM6v8lAas8UdHmIndm3ky38JCUWsQGmeZ9amJwqTns2wH00uZkgiOKJ
//Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops: price_1MqqLoHAGNRbz6trXdSAGucW
//Mens Casual Premium Slim Fit T-Shirts:price_1MqqOmHAGNRbz6tr33HMm4bh
//Mens Cotton Jacket:price_1MqqQfHAGNRbz6tr1L8CVwZW
//Mens Casual Slim Fit:price_1MqqSeHAGNRbz6trOHH6eq19
//John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet:price_1MqqUyHAGNRbz6trAFyCA7GG
//Solid Gold Petite Micropave:price_1MqqWqHAGNRbz6trD4iCS0B1
//White Gold Plated Princess:price_1MqqYTHAGNRbz6tr9XYLxUVP
//Pierced Owl Rose Gold Plated Stainless Steel Double:price_1Mqqa1HAGNRbz6trBuZTwe3g
//WD 2TB Elements Portable External Hard Drive - USB 3.0:price_1MqqcJHAGNRbz6trtxEHPk95
//SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s:price_1MqqeQHAGNRbz6trhO8ulc1t
//Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5:price_1MqqfjHAGNRbz6trGvuwZS3t
//WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive:price_1MqqhFHAGNRbz6trxZLkYJ7Z
//Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin:price_1MqqivHAGNRbz6trMPudGJxr
//Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED:price_1MqqkuHAGNRbz6trASNlHGK2
//BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats:price_1MqqmdHAGNRbz6trRi81eD7y
//Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket:price_1MqqovHAGNRbz6trnJYjT7kv
//Rain Jacket Women Windbreaker Striped Climbing Raincoats:price_1MqqpyHAGNRbz6trsYS9v5Bg
//MBJ Women's Solid Short Sleeve Boat Neck V:price_1MqqryHAGNRbz6triKRGzRkp
//Opna Women's Short Sleeve Moisture:price_1MqqtIHAGNRbz6trS4T3BrbP
//DANVOUY Womens T Shirt Casual Cotton Short:price_1MqqugHAGNRbz6trNyZKBarK

require('dotenv').config()

const express = require('express')
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173"
}))


const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    ['price_1MqqLoHAGNRbz6trXdSAGucW', {priceInCents: 10995, name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'}],
    ['price_1MqqOmHAGNRbz6tr33HMm4bh', {priceInCents: 2230, name: 'Mens Casual Premium Slim Fit T-Shirts'}],
    ['price_1MqqQfHAGNRbz6tr1L8CVwZW', {priceInCents: 5599, name: 'Mens Cotton Jacket'}],
    ['price_1MqqSeHAGNRbz6trOHH6eq19', {priceInCents: 1599, name: 'Mens Casual Slim Fit'}],
    ['price_1MqqUyHAGNRbz6trAFyCA7GG', {priceInCents: 69500, name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet"}],
    ['price_1MqqWqHAGNRbz6trD4iCS0B1', {priceInCents: 16800, name: 'Solid Gold Petite Micropave'}],
    ['price_1MqqYTHAGNRbz6tr9XYLxUVP', {priceInCents: 999, name: 'White Gold Plated Princess'}],
    ['price_1Mqqa1HAGNRbz6trBuZTwe3g', {priceInCents: 1099, name: 'Pierced Owl Rose Gold Plated Stainless Steel Double'}],
    ['price_1MqqcJHAGNRbz6trtxEHPk95', {priceInCents: 6400, name: 'WD 2TB Elements Portable External Hard Drive - USB 3.0'}],
    ['price_1MqqeQHAGNRbz6trhO8ulc1t', {priceInCents: 10900, name: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s'}],
    ['price_1MqqfjHAGNRbz6trGvuwZS3t', {priceInCents: 10900, name: 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5'}],
    ['price_1MqqhFHAGNRbz6trxZLkYJ7Z', {priceInCents: 11400, name: 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive'}],
    ['price_1MqqivHAGNRbz6trMPudGJxr', {priceInCents: 59900, name: 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin'}],
    ['price_1MqqkuHAGNRbz6trASNlHGK2', {priceInCents: 99999, name: 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED'}],
    ['price_1MqqmdHAGNRbz6trRi81eD7y', {priceInCents: 5699, name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats"}],
    ['price_1MqqovHAGNRbz6trnJYjT7kv', {priceInCents: 2995, name: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket"}],
    ['price_1MqqpyHAGNRbz6trsYS9v5Bg', {priceInCents: 3999, name: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats'}],
    ['price_1MqqryHAGNRbz6triKRGzRkp', {priceInCents: 985, name: "MBJ Women's Solid Short Sleeve Boat Neck V"}],
    ['price_1MqqtIHAGNRbz6trS4T3BrbP', {priceInCents: 795, name: "Opna Women's Short Sleeve Moisture"}],
    ['price_1MqqugHAGNRbz6trNyZKBarK', {priceInCents: 1299, name: "DANVOUY Womens T Shirt Casual Cotton Short"}]
])

app.post('/create-checkout-session', async (req, res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            line_items:req.body.items.map(item =>{
                const storeItem = storeItems.get(item.id)
                return {
                    price_data:{
                        currency:'usd',
                        product_data:{
                            name:storeItem.name
                    },
                    unit_amount:storeItem.priceInCents
                },
                    quantity:item.quantity
                }
            }),
            success_url:`${process.env.CLIENT_URL}?success=true`,
            cancel_url:`${process.env.CLIENT_URL}?cancelled=true`

        })

        const successAlert = 'alert("success")';
        const cancelAlert = 'alert("cancel")';
        
        session.success_url += `&onSuccess=${encodeURIComponent(successAlert)}`;
        session.cancel_url += `&onCancel=${encodeURIComponent(cancelAlert)}`;


        res.json({url:session.url})
    } catch (e){
        res.status(500).json({error:e.message})
    }
})

app.listen(3000)