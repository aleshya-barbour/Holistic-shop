import Commerce from '@chec/commerce.js';


export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);

commerce.products.list().then((product) => console.log(product));
commerce.cart.retrieve().then((cart) => console.log(cart));
commerce.cart.refresh().then((cart) => console.log(cart));
// commerce.checkout.generateToken('Vanilla Candle', {type: 'permalink'}).then((checkout) => 
// console.log(checkout.id))

