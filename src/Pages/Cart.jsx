import React from 'react'
import CartItems from "../components/CartItems/CartItems"

const Cart = () => {
  return (
    <div>
      <CartItems/>
    </div>
  )
}

export default Cart


// import { useContext } from "react";
// import { ShopContext } from "../../context/ShopContext";

// const ProductDisplay = ({ product }) => {
//   const { addToCart } = useContext(ShopContext);

//   return (
//     <button onClick={() => addToCart(product.id)}>
//       Add to Cart
//     </button>
//   );
// };
