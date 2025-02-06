import React, { useEffect , useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart';
import { FaShoppingCart , FaTimes , FaBars } from 'react-icons/fa';

function Navbar() {
  const [isLogin , setIsLogin] = useState(false);
  const [prof , setProf] = useState('');
  const [menuOpen , setMenuOpen] = useState(false);

  const {cart} = useCart();

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');

    if(token){
      setIsLogin(true);
      if(name){
        const nameParts = name.split(' ');
        const initials = nameParts.length >= 2 ?
        nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase()
        : nameParts[0][0].toUpperCase();
        setProf(initials);
      }
    }
  } , []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLogin(false);
    navigate("/login");
  }

  const isActive = (path) => location.pathname === path;
  return (
    <div className=' sticky z-20 top-0 px-4 lg:px-16 py-4 lg:py-8 bg-gradient-to-bl from-orange-200 to-orange-300 flex justify-between items-center '>
        <Link to="/"><div className=' text-red-500 uppercase text-4xl font-extrabold '>
          zwiggy
        </div>
        </Link>
        <button className="lg:hidden relative text-red-600" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        {(cart.length > 0 && !menuOpen) && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
          {cart.length}
        </span>
      )}
        </button>
        <div className={`lg:flex list-none items-center space-x-6 text-red-600 text-lg font-semibold capitalize transition-all
          ${menuOpen ? "absolute top-16 right-0 rounded-lg z-10 w-36 bg-orange-300 p-4 flex flex-col justify-center items-center gap-4 shadow-md" : "hidden gap-6 lg:flex"}`}>
            {menuOpen && <Link to='/'><li className={`relative flex items-center gap-2 cursor-pointer rounded-md ${
              isActive("/") ? "bg-orange-500 text-white px-2 py-1" : "hover:underline text-red-600"
            }`}>
              Home
            </li>
            </Link>}
          {isLogin && <li className="bg-orange-400 hover:bg-orange-500 cursor-pointer text-red-600 font-bold px-2 py-1 rounded-full text-lg">
                            {prof}
                        </li>}
          {!isLogin ? <Link to="/login" onClick={() => setMenuOpen(false)}><li className=' px-2 py-1 hover:underline cursor-pointer'>
            login
          </li>
          </Link> : <li onClick={handleLogout} className=' px-2 py-1 hover:underline cursor-pointer'>Logout</li>}
          <Link to="/checkOrder" onClick={() => setMenuOpen(false)}><li className={`cursor-pointer px-2 py-1 rounded-md ${
              isActive("/checkOrder") ? "bg-orange-500 text-white" : "hover:underline"
            }`}>
            Orders
          </li>
          </Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            <li className={`relative flex justify-center items-center gap-2 cursor-pointer rounded-md ${
              isActive("/cart") ? "bg-orange-500 text-white px-2 py-1" : "hover:underline text-red-600"
            }`}>
              {/* Cart Icon */}
              <FaShoppingCart size={24}  />

              {/* Cart Item Count Badge */}
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex justify-center items-center">
                  {cart.length}
                </span>
              )}
            </li>
          </Link>

        </div>
    </div>
  )
}

export default Navbar