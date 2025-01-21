import { BrowserRouter, Route, Routes } from "react-router";
import './App.css'
import NavBar from './components/NavBar';
import Home from './components/Home';
import Basket from './components/Basket';
import { useState } from "react";


function App() {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const [disc, setDiscount] = useState(0);



  const updateTotalAndDiscount = (newQuantities, currentCart) => {
    const newTotal = currentCart.reduce((sum, item) => {
      const quantity = newQuantities[item.id] || 1;
      return sum + (item.price * quantity);
    }, 0);

    const newDiscount = newTotal * 0.10;

    setTotal(newTotal);
    setDiscount(newDiscount);
  };

  const increaseQuantity = (productId) => {
    const newQuantities = {
      ...quantities,
      [productId]: (quantities[productId] || 1) + 1
    };
    setQuantities(newQuantities);
    updateTotalAndDiscount(newQuantities, cart);
  };

  const decreaseQuantity = (productId) => {
    const newQuantities = {
      ...quantities,
      [productId]: Math.max((quantities[productId] || 1) - 1, 1)
    };
    setQuantities(newQuantities);
    updateTotalAndDiscount(newQuantities, cart);
  };

  const addToCart = (product) => {
    if (!cart.some(item => item.id === product.id)) {
      const quantity = quantities[product.id] || 1;
      const newCart = [...cart, product];
      setCart(newCart);

      const newTotal = total + (product.price * quantity);
      setTotal(newTotal);
      setDiscount(newTotal * 0.10);
    }
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);

    const newQuantities = { ...quantities };
    delete newQuantities[productId];
    setQuantities(newQuantities);

    if (newCart.length === 0) {
      setTotal(0);
      setDiscount(0);
      setQuantities({});
    } else {
      updateTotalAndDiscount(newQuantities, newCart);
    }
  };

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
          <Route path="/Basket" element={<Basket cart={cart} setCart={setCart} total={total} disc={disc} removeFromCart={removeFromCart} quantities={quantities} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
