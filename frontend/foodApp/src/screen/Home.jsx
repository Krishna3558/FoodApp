import React, { useEffect , useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight , FaSearch } from "react-icons/fa";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

function Home() {
  const[foodItem , setFoodItem] = useState([]);
  const[foodCat , setFoodCat] = useState([]);
  const[loading , setLoading] = useState(true);
  const[error , setError] = useState(null);
  const catRefrence = useRef(null);
  const [item , setItem] = useState(null);
  const [active , setActive] = useState(false);
  const [search , setSearch] = useState('');
  const url = 'http://localhost:3000';
  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await fetch(`${url}/food/item` , {
          method : "GET",
          headers : {
            "Content-Type": "application/json"
          }
        });

        const catResponse = await fetch(`${url}/food/category` , {
          method: "GET",
          headers: {
            "Content-Type" : "application/json"
          }
        });

        if(!catResponse.ok) throw new Error("failed to load category");

        if(!response.ok) throw new Error("failed to fetch the data");

        const data = await response.json();
        const catData = await catResponse.json();
        setFoodCat(catData.response);
        setFoodItem(data.response);
        setLoading(false);
      }
      catch(err){
        setError(err.message);
        setLoading(false);
      }
    }
    fetchData();
  } , []);

  const scrollLeft = () => {
    catRefrence.current.scrollBy({left: -160 , behavior: "smooth"});
  };

  const scrollRight = () => {
    catRefrence.current.scrollBy({left: 160 , behavior: "smooth"});
  }

  const handleOptions = (cat) => {
    if( item === cat ){
      setItem(null);
    }
    else{
      setItem(cat);
    }
  }

  const [filteredItem , setFilteredItem] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]); 

  useEffect(() => {
    let filter = item ? (foodItem.filter(data => data.category === item )) : foodItem;
    filter = filter.filter((data) => data.Name.toLowerCase().includes(search.toLowerCase()))
    setFilteredItem(filter);
    console.log(filteredItem);
  },[search , item , foodItem])

  useEffect(() => {
      setDisplayedItems(filteredItem);
  }, [filteredItem]);


  return (
    <div>
        <Navbar/>
        <div className=' flex justify-center mt-6 px-4 '>
          <div className=' w-full md:w-[650px] lg:w-[810px]'>
            <div>
              <div className=' flex justify-between items-center pb-5'>
              <h1 className=' text-lg md:text-xl lg:text-2xl font-semibold md:font-bold lg:font-extrabold'>What's on your mind?</h1>
              <div className=' flex gap-2 max-md:hidden'>
                <button onClick={scrollLeft} className={` bg-gray-300 rounded-full px-2 py-2 flex justify-center items-center hover:bg-gray-400 `}>
                  <FaChevronLeft size={20} />
                </button>
                <button onClick={scrollRight} className={` bg-gray-300 rounded-full px-2 py-2 flex justify-center items-center hover:bg-gray-400 `}>
                  <FaChevronRight size={20} />
                </button>
              </div>
              </div>
              <div ref={catRefrence} className=' flex gap-5 max-md:flex-wrap max-md:justify-center md:overflow-x-scroll md:scroll-smooth md:whitespace-nowrap' style={{scrollBehavior: "smooth" , scrollbarWidth: "none"}}>
                  {
                    foodCat.map((items) => (
                      <div>
                      <button onClick={() => handleOptions(items.category)} className= {`bg-cover h-16 w-16 md:h-36 md:w-36 rounded-full ${item === items.category ? 'border-4 border-orange-300' : ''}`}  style={{backgroundImage: `url(${items.img})`}}>
                        
                      </button>
                      <h1 className=' text-sm md:text-lg font-medium capitalize text-center'>
                        {items.category}
                      </h1>
                      </div>
                    ))
                  }
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
        <div className="relative w-3/4">
          <input
            type="text"
            placeholder="Search for food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 text-lg border-2 border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <FaSearch className="absolute right-4 top-3 text-orange-500" size={20} />
        </div>
      </div>
        <ul className='my-6 flex flex-wrap gap-6 justify-center'>
          {
            filteredItem.map((item) => (
              <Card details={item} />
            ))
          }
        </ul>
        <footer>
          <Footer/>
        </footer>
    </div>
  )
}

export default Home