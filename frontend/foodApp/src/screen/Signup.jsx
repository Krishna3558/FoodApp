import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [phone , setPhone] = useState('');
    const [address , setAddress] = useState('');
    const [password , setPassword] = useState('');
    const [message , setMessage] = useState('');
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState({});
    const url = "http://localhost:3000";

    const navigate = useNavigate();

    const validateForm = () => {
        let newError = {};

        if(email === ''){
            newError.email = "Email is required*"
        }
        if(name === ''){
            newError.name = "Name is required*"
        }
        if(phone === ''){
            newError.phone = "Phone is required*"
        }
        else if(phone.length != 10){
            newError.phone = "Phone no. is not valid"
        }
        if(address === ''){
            newError.address = "Address is required*"
        }
        if(password === ''){
            newError.password = "Password is required*"
        }
        else if(password.length < 8 ){
            newError.password = "Create a strong password"
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const submitForm = async(e) => {
        e.preventDefault();
        setMessage('');
        if(!validateForm()) return;
        setLoading(true);

        try{
            const response = await fetch(`${url}/user/signup` , {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({name , email , phone , address , password})
            });

            const data = await response.json();

            if(!response.ok) {
                if(data.message){
                    setMessage(data.message);
                }
                setLoading(false);
                throw new Error("server is not responding");
            }

            setLoading(false);
            navigate('/login');
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className=' min-h-screen flex justify-center items-center'>
        <form onSubmit={(e) => submitForm(e)} className=' w-full md:w-2/3 lg:w-1/2 flex flex-col justify-center rounded-xl bg-orange-100 border-orange-300 py-4 items-center gap-4 text-lg font-semibold border-2 '>
            <h1 className=' text-4xl font-bold text-orange-400'>Sign Up</h1>
            <div>
                <p>Name</p>
                <input
                    type="text"
                    placeholder='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=' outline-none bg-orange-200 px-2 rounded-lg py-1 text-lg text-red-800 md:w-sm'
                />
                {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
            </div>
            <div>
                <p>Email</p>
                <input 
                    type="email"
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=' outline-none bg-orange-200 px-2 rounded-lg py-1 text-lg text-red-800 md:w-sm'
                />
                {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
            </div>
            <div>
                <p>Address</p>
                <input
                    type="text"
                    placeholder='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className=' outline-none bg-orange-200 px-2 rounded-lg py-1 text-lg text-red-800 md:w-sm'
                />
                {error.address && <p className="text-red-500 text-sm mt-1">{error.address}</p>}
            </div>
            <div>
                <p>Phone</p>
                <input
                    type="text"
                    placeholder='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className=' outline-none bg-orange-200 px-2 rounded-lg py-1 text-lg text-red-800 md:w-sm'
                />
                {error.phone && <p className="text-red-500 text-sm mt-1">{error.phone}</p>}
            </div>
            <div>
                <p>Password</p>
                <input
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=' outline-none bg-orange-200 px-2 rounded-lg py-1 text-lg text-red-800 md:w-sm'
                />
                {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
            </div>
            <div className=' flex gap-2'>
                <p className=' text-base'>Already a user? </p>
                <p onClick={() => navigate('/login')} className=' text-blue-700 text-base cursor-pointer'>Click here</p>
            </div>
            <div>
                {message && <p className=' text-base capitalize text-red-600'>{message}!!</p>}
            </div>
            <button type="submit" className=' bg-orange-400 text-xl text-white px-2 py-1 rounded-md '>
                {loading ? 'Sign Up...' : 'Sign Up'}
            </button>
        </form>
    </div>
  )
}

export default Signup