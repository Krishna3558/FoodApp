import React , {useContext , createContext, useState, useEffect} from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart , setCart] = useState([]);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const url = 'https://foodapp-omih.onrender.com';

    useEffect(() => {
        const fetchCart = async () => {
            if (!token) return;

            try {
                const response = await fetch(`${url}/orders/cart`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch cart");

                const data = await response.json();

                if (data.cart && data.cart.length > 0) {
                    setCart(data.cart);
                }
            } catch (err) {
                console.error("❌ Error fetching cart:", err);
            }
        };

        fetchCart();
    }, [token]);

    const addToCart = async(newItem) => {
        try {
            const response = await fetch(`${url}/orders/cart` , {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newItem)
            });

            const data = await response.json();

            if(!response.ok){
                if(data.message){
                    console.log(data.message);
                }
                throw new Error(Error.message);
            }

            setCart((prev) => {
                // Check if item already exists in the cart
                const existingItemIndex = prev.findIndex(item => item.foodItem === newItem.foodItem);
        
                if (existingItemIndex !== -1) {
                    // Item exists in the cart, update it
                    const updatedCart = [...prev];
                    updatedCart[existingItemIndex] = newItem;
                    return updatedCart;
                } else {
                    return [...prev, newItem];
                }
            });
        } 
        catch(err){
            console.log(err);
        }
    }

    const removeCart = async(id) => {
        try{
            const response = await fetch(`${url}/orders/cart/${id}` , {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            if(data.message){
                console.log(data.message);
            }

            setCart(cart.filter((item) => item.foodItem !== id));
        }
        catch(err){
            console.error(err);
        }
    }

    const placeOrder = async(orderDetails) => {
        try{
            const response = await fetch(`${url}/orders/order` , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(orderDetails)
            });

            if(!response.ok){
                throw new Error("Server Error");
            }

            setCart([]);
        }
        catch(err){
            console.error(err);
        }
    }

    const fetchFoodData = async (itemId) => {
            try {
                const response = await fetch(`${url}/food/cart/${itemId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch food data");

                const data = await response.json();
                if (data.foodData) {
                    return data.foodData;
                }
            } catch (error) {
                console.error("Error fetching food data:", error);
            }
    };
    

    return (
        <CartContext.Provider value={{addToCart , removeCart , placeOrder , fetchFoodData , cart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext);
};
