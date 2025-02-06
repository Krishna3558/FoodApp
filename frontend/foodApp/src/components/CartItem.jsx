import React, { useEffect, useState } from 'react'
import { FaTrash , FaMinus , FaPlus } from 'react-icons/fa';
import { useCart } from '../context/useCart';

function CartItem({itemId , price , choice , quant}) {
    const url = "https://foodapp-omih.onrender.com";
    const {removeCart , addToCart , fetchFoodData} = useCart();
    const [foodData , setFoodData] = useState({});
    useEffect(() => {
        const fetchData = async() => {
            const data = await fetchFoodData(itemId);
            setFoodData(data);
        }
        if(itemId){
            fetchData();
        }
    }, [itemId]);
  return (
    <div className='flex flex-col items-center'>
    <div className=" w-full md:w-3/4 flex items-center justify-between bg-white shadow-md rounded-xl p-4 mb-4 border">
        <div className="w-20 h-20 bg-cover bg-center rounded-lg" 
                style={{ backgroundImage: `url(${foodData.img})` }}>
        </div>
        <div className="flex-1 ml-4">
                <h2 className=" text-sm md:text-lg font-bold capitalize">{foodData.Name}</h2>
                <p className="text-gray-500 text-sm">Option: <span className="font-medium capitalize">{choice}</span></p>
                <p className="text-orange-600 font-bold text-lg">₹{price*quant}</p>
        </div>
        <div className="flex flex-col md:flex-row items-center">
                <button 
                    className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 disabled:opacity-50"
                    disabled = {quant <= 1}
                    onClick={() => addToCart({foodItem: itemId , quantity: quant - 1 , price: price , userChoice: choice})}
                >
                    <FaMinus size={12} />
                </button>

                <span className="mx-4 font-semibold text-lg">{quant}</span>

                <button 
                    className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
                    onClick={() => addToCart({foodItem: itemId , quantity: quant + 1 , price: price , userChoice: choice})}
                >
                    <FaPlus size={12} />
                </button>
            </div>
        <button 
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => removeCart(itemId)}
            >
                <FaTrash size={18} />
        </button>
    </div>
    </div>
  )
}

export default CartItem
