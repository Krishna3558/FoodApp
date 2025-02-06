import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [message , setMessage] = useState('');
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState({});
    const navigate = useNavigate();
    const url = "http://localhost:3000";

    const validateForm = () => {
        let newError = {};

        if(email === ''){
            newError.email = "Email is required*"
        }
        if(password === ''){
            newError.password = "Password is required*"
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
            const response = await fetch(`${url}/user/login` , {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({email , password})
            });

            const data = await response.json();

            if(!response.ok){
                if(data.message){
                    setMessage(data.message);
                }
                setLoading(false);
                throw new Error("server error");
            }

            if(data.token){
                const token = data.token;
                console.log("token" , token);
                localStorage.setItem('token' , token);
                localStorage.setItem('userName' , data.user.name);
                localStorage.setItem('userId' , data.user._id);
            }
            
            setLoading(false);
            navigate('/');
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className=' min-h-screen flex justify-center items-center'>
        <form onSubmit={(e) => submitForm(e)} className=' w-full md:w-2/3 lg:w-1/2 flex flex-col justify-center rounded-xl bg-orange-100 border-orange-300 py-4 items-center gap-4 text-lg font-semibold border-2 '>
            <h1 className=' text-4xl font-bold text-orange-400'>Login</h1>
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
                <p className=' text-base'>Not an existing user? </p>
                <p onClick={() => navigate('/signup')} className=' text-blue-700 text-base cursor-pointer'>Click here</p>
            </div>
            <div>
                <p className=' text-base capitalize text-red-600'>{message}</p>
            </div>
            <button type="submit" className=' bg-orange-400 text-xl text-white px-2 py-1 rounded-md '>
            {loading ? 'Login...' : 'Login'}
            </button>
        </form>
    </div>
  )
}

export default Login