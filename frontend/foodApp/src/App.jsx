import { BrowserRouter , Route , Routes } from "react-router-dom"
import Home from "./screen/Home"
import Login from "./screen/Login"
import Signup from "./screen/Signup"
import Cart from "./screen/Cart"
import { CartProvider } from "./context/useCart"
import Order from './screen/Order'
import OrderList from "./screen/OrderList"
function App() {

  return (
    <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/checkOrder" element={<OrderList/>}/>
      </Routes>
    </CartProvider>
    </BrowserRouter>
  )
}

export default App
