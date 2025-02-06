import React , {useState} from 'react'
import { useCart } from '../context/useCart';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

function Order() {
    const [userName, setUserName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [paymentMethod] = useState("Cash on Delivery"); // Fixed payment option
    const [error, setError] = useState("");
    const [showMessage , setShowMessage] = useState(false);
    const {cart , placeOrder} = useCart();
    const navigate = useNavigate();

    const totalItems = cart.reduce((acc , item) => acc + item.quantity , 0);
    const totalPrice = cart.reduce((acc , item) => acc + (item.price * item.quantity) , 0);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form inputs
        if (!userName || !address || !contact) {
            setError("All fields are required");
            return;
        }

        // Handle order submission (e.g., send data to backend or show success message)
        console.log({
            userName,
            address,
            contact,
            paymentMethod,
            totalItems,
            totalPrice
        });

        placeOrder({userName: userName , delAddress: address , contact: contact});
        navigate('/');

        // Reset form on successful submission
        setUserName("");
        setAddress("");
        setContact("");
        setError("");
        setShowMessage("Order placed successfully!");
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    return (
        <div className=' min-h-screen flex items-center justify-center'>
        <div className="bg-white p-6 rounded-lg shadow-md shadow-orange-200 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4 text-orange-500 text-center">Order Page</h2>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* User Name */}
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-orange-700">Name</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your name"
                    />
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label htmlFor="address" className="block text-orange-700">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your address"
                    />
                </div>

                {/* Contact */}
                <div className="mb-4">
                    <label htmlFor="contact" className="block text-orange-700">Contact Number</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your contact number"
                    />
                </div>

                {/* Payment Option */}
                <div className="mb-4">
                    <label htmlFor="payment" className="block text-orange-700">Payment Option</label>
                    <select
                        id="payment"
                        name="payment"
                        value={paymentMethod}
                        disabled
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="Cash on Delivery">Cash on Delivery</option>
                    </select>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-700">Bill Summary</h3>
                    <hr/>
                    <div className="flex justify-between text-gray-700 font-semibold mt-4">
                        <span>Total Items</span>
                        <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 font-semibold mt-2">
                        <span>Total Price</span>
                        <span>₹{(totalPrice*0.18 + totalPrice + 10.00).toFixed(2)}</span>
                    </div>
                    <hr/>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
                    >
                        Place Order
                    </button>
                </div>
            </form>
        </div>
        {showMessage && (
                        <div className=" mb-2 px-4 py-2 text-white bg-green-600 rounded-md text-sm flex items-center gap-2">
                            <FaCheckCircle />
                            {showMessage}
                        </div>
        )}
        </div>
    );
}

export default Order