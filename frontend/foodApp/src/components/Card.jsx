import React, { useState , useEffect } from 'react'
import { useCart } from '../context/useCart';
import { FaCheckCircle } from 'react-icons/fa';

function Card(props) {
    const data = props.details;
    const foodItem = data._id;
    const image = data.img;
    const name = data.Name;
    const options = data.options || []; // Ensure options exist
    const option = options.length > 0 ? options[0] : {}; 

    const choice = option ? Object.keys(option) : [];

    const [msg , setMsg] = useState('');
    const token = localStorage.getItem('token');
    const url = 'http://localhost:3000';

    const {addToCart , cart , removeCart} = useCart();
    const items = cart.find(item => item.foodItem === foodItem);
    const [userChoice , setUserChoice] = useState(items?.userChoice || (choice[0]));
    const [quantity , setQuantity] = useState(items?.quantity || 0);
    const [added , setAdded] = useState(false);
    const [showMessage , setShowMessage] = useState(false);

    const removeQuant = () => {
        if(!token){
            alert("User is not logged in ");
        }
        else{ 
            if(quantity > 1){
                setQuantity(prev => prev - 1);
            }
            else{
                setQuantity(0);
                removeCart(foodItem);
            }
        }
    }

    const addQuant = () => {
        if(!token){
            alert("User is not logged in ");
        }
        else{
            setQuantity((prev) => prev + 1);
        }
    }

    const handleAddToCart = (item) => {
        if(quantity === 0){
            setShowMessage("First add quantity on '+' icon");
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
            return;
        }
        addToCart(item);
        setShowMessage("item added to the cart");
        setAdded(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    }

    useEffect(() => {
        setUserChoice(items?.userChoice || (choice[0]));
        setQuantity(items?.quantity || 0);
    }, [data]);
    
  return (
    <div className=' border-2 rounded-2xl border-slate-300 w-60 h-72 '>
        <div className='h-1/2 bg-cover bg-center border-b-2 border-slate-300 rounded-t-2xl' style={{ backgroundImage: `url('${image}')` }}>
        </div>
        <div>
            <h1 className=' text-center capitalize text-xl font-bold mt-2'>
                {name}
            </h1>
            <div className=' my-4 flex justify-around'>
                <p className=' font-bold text-2xl'>Rs. {option[userChoice]}/-</p>
                
                <select onChange={(e) => {setUserChoice(e.target.value)}} value={userChoice} className=' bg-orange-400 capitalize text-white font-medium rounded-lg'>
                    {
                        choice.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))
                    }
                </select>
            </div>
        </div>
        <div className=' text-center text-white'>
            <button onClick={removeQuant} disabled={quantity === 0} className={` capitalize bg-orange-600 mr-1 px-2 rounded-md ${quantity === 0 ? 'opacity-70' : ''} `}>-</button>
            <button onClick={() => handleAddToCart({foodItem: foodItem , quantity: quantity , price: option[userChoice] , userChoice: userChoice})} className=' uppercase bg-orange-600 px-1 rounded-md hover:bg-orange-700 '>add {quantity !== 0 && <p className=' inline bg-orange-400 px-1 rounded-full'>{quantity}</p>} </button>
            <button onClick={addQuant} className={` capitalize bg-orange-600 ml-1 px-2 rounded-md `}>+</button>
        </div>
        {showMessage && (
                <div className=" mb-2 px-4 py-2 text-white bg-green-600 rounded-md text-sm flex items-center gap-2">
                    <FaCheckCircle />
                    {showMessage}
                </div>
        )}
    </div>
  )
}

export default Card