import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import Navbar from "../components/Navbar";

function OrderList() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const url = "https://foodapp-omih.onrender.com";
  const [orderList, setOrderList] = useState([]);
  const [expand, setExpand] = useState(null);
  const [foodData, setFoodData] = useState({});
  const [loading, setLoading] = useState(true);
  const { fetchFoodData } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}/orders/order`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrderList(data.order);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    setLoading(false);
  }, [token]);

  useEffect(() => {
    const fetchAllFoodData = async () => {
        if (orderList.length === 0) return; // ✅ Prevent fetching if no orders exist
      setLoading(true);
      const updatedData = {};
      for (const order of orderList) {
        for (const item of order.items) {
          if (!updatedData[item.foodItem]) {
            const data = await fetchFoodData(item.foodItem);
            updatedData[item.foodItem] = data;
          }
        }
      }
      setFoodData(updatedData);
      setLoading(false); // Mark as loaded after fetching food data
    };

    if (orderList.length > 0) {
      fetchAllFoodData();
    } else {
      setLoading(false);
    }
  }, [orderList]);

  const toggleOrderDetails = (orderId) => {
    setExpand(expand === orderId ? null : orderId);
  };

  const statusColor = {
    pending: "text-yellow-600",
    cancelled: "text-red-600",
    delivered: "text-green-500",
  };

  return (
    <div>
      <Navbar />
      {token ? (
        <div className="min-h-screen flex justify-center w-full md:p-4">
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-extrabold text-orange-700 mb-4 text-center">
              Your Orders
            </h2>

            {loading ? (
              <p className="text-center text-orange-500 text-lg font-bold">
                Loading orders...
              </p>
            ) : orderList.length === 0 ? (
              <p className="text-center text-black">No previous orders found.</p>
            ) : (
              orderList.map((order) => {
                const firstItem = order.items[0]?.foodItem;
                const firstItemName = foodData[firstItem]?.Name || "Unknown Item";
                const remainingCount = order.items.length - 1;

                return (
                  <div key={order._id} className="mb-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleOrderDetails(order._id)}>
                      <div>
                        <h3 className="text-lg font-bold text-orange-600 capitalize">
                          {remainingCount > 0 ? `${firstItemName} + ${remainingCount}` : firstItemName}
                        </h3>
                        <p className="text-lg font-semibold text-black">
                          Total Price: ₹{((order.totalAmount) + (order.totalAmount) * 0.18 + 10.0).toFixed(2)}
                        </p>
                        <p className="text-lg font-semibold text-black">
                          Date: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-red-400 text-lg">{expand === order._id ? "▲" : "▼"}</span>
                    </div>

                    {expand === order._id && (
                      <div className="mt-3 bg-white p-3 rounded-lg">
                        <h3 className="text-md font-semibold text-orange-500">Order Details:</h3>
                        <ul className="list-decimal capitalize list-inside font-semibold text-black">
                          {order.items.map((item, index) => (
                            <li key={index}>
                              {foodData[item.foodItem]?.Name || "Unknown"} - {item.quantity} x ₹{item.price}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 text-orange-700">
                          <p className="font-semibold">
                            Address: <span className="ml-1 text-black">{order.delAddress}</span>
                          </p>
                          <p className="font-semibold">
                            Order Status: <span className={`ml-1 capitalize ${statusColor[order.orderStatus]}`}>{order.orderStatus}</span>
                          </p>
                          <p className="font-semibold">
                            Payment: <span className="ml-1 text-black">Cash on Delivery</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen justify-center gap-6 items-center">
          <h1 className="text-5xl font-bold text-orange-600 capitalize">User is not logged in</h1>
          <img src="warning.webp" alt="warning image" className="h-28" />
          <h4 className="text-3xl font-semibold text-red-600 capitalize">Login to check your orders</h4>
          <button onClick={() => navigate("/login")} className="bg-orange-500 text-white rounded-md px-2 py-1 font-medium hover:bg-orange-600 cursor-pointer">
            Login Click here
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderList;
