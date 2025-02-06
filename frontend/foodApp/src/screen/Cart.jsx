import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import Navbar from "../components/Navbar";
import { useCart } from "../context/useCart";

function Cart() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { cart } = useCart();
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            <Navbar />
            {token ? (
                cart.length > 0 ? ( // ✅ If cart is NOT empty, show cart items + bill
                    <div className="mt-8">
                        {cart.map((item) => (
                            <CartItem key={item.foodItem} itemId={item.foodItem} price={item.price} quant={item.quantity} choice={item.userChoice} />
                        ))}

                        {/* Bill Details */}
                        <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto">
                            <h2 className="text-2xl font-semibold text-orange-800 mb-4">Bill Details</h2>
                            <div className="mb-4">
                                <div className="flex justify-between text-gray-700">
                                    <span>Item Total</span>
                                    <span>₹{totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Platform Fee</span>
                                    <span>₹10.00</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>GST and Restaurant Charges</span>
                                    <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-300 my-4"></div>

                            {/* Total Price */}
                            <div className="flex justify-between text-xl font-semibold text-gray-800">
                                <span>Total</span>
                                <span>₹{(totalPrice * 0.18 + totalPrice + 10.00).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <div className="text-center mt-2">
                            <Link to="/order">
                                <button className="bg-orange-600 text-white rounded-md px-4 text-xl py-2 hover:bg-orange-700">
                                    Place Order
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : ( // ✅ If cart is EMPTY, show "Cart is Empty" message
                    <div className="flex flex-col min-h-screen justify-center items-center gap-6">
                        <h1 className="text-4xl font-bold text-gray-700">Your Cart is Empty</h1>
                        <img src="emptyCart.webp" alt="Empty Cart" className="h-40" />
                        <Link to="/">
                            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-orange-600">
                                Go to Home
                            </button>
                        </Link>
                    </div>
                )
            ) : (
                // If user is not logged in
                <div className="flex flex-col min-h-screen justify-center gap-6 items-center">
                    <h1 className="text-5xl font-bold text-orange-600 capitalize">User is not logged in</h1>
                    <img src="warning.webp" alt="Warning" className="h-28" />
                    <h4 className="text-3xl font-semibold text-red-600 capitalize">Login to access add to cart</h4>
                    <button onClick={() => navigate("/login")} className="bg-orange-500 text-white rounded-md px-2 py-1 font-medium hover:bg-orange-600 cursor-pointer">
                        Login Click here
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;