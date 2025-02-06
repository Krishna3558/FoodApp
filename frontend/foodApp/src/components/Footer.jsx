import React from 'react'

function Footer() {
  return (
    <footer className=' bg-gray-200 py-10'>
        <h1 className=' flex flex-col md:flex-row justify-center gap-5 items-center mb-10'>
            <p className=' text-lg md:text-2xl font-bold'>
            For better experience,download the Swiggy app now
            </p>
            <img src='app_store.avif' alt='app store' className=' h-10 w-24 lg:h-12 lg:w-28' />
            <img src='play_store.avif' alt='play store' className=' h-10 w-24 lg:h-12 lg:w-28' />
        </h1>
        <div className=' flex max-sm:flex-wrap gap-4 justify-center '>
            <ul className=' capitalize text-gray-500 text-sm pb-2 '>
                <li className=' text-black font-bold text-lg mb-2'>company</li>
                <li>About Us</li>
                <li>Swiggy Corporate</li>
                <li>Careers</li>
                <li>Team</li>
                <li>Swiggy One</li>
                <li>Swiggy Instamart</li>
                <li>Swiggy Dineout</li>
            </ul>
            <ul className=' capitalize text-gray-500 text-sm'>
                <li className=' text-black font-bold text-lg mb-2'>contact us</li>
                <li>Help & Support</li>
                <li>Partner with us</li>
                <li>Ride with us</li>
            </ul>
            <ul className=' capitalize text-gray-500 text-sm'>
                <li className=' text-black font-bold text-lg mb-2'>available in:</li>
                <li>Bangalore</li>
                <li>Gurgaon</li>
                <li>Hyderabad</li>
                <li>Delhi</li>
                <li>Mumbai</li>
                <li>Pune</li>
            </ul>
            <ul className=' capitalize text-gray-500 text-sm'>
                <li className=' text-black font-bold text-lg mb-2'>Life at Swiggy</li>
                <li>Explore with Swiggy</li>
                <li>Swiggy News</li>
                <li>Snackables</li>
            </ul>
            <ul className=' capitalize text-gray-500 text-sm'>
                <li className=' text-black font-bold text-lg mb-2'>Legal</li>
                <li>Terms & Conditions</li>
                <li>cookie policy</li>
                <li>privacy policy</li>
                <li>investor relations</li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer