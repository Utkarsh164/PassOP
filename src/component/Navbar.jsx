import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>

        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
    <div className='logo font-bold text-2xl'> 
    <span className='text-red-500'>&lt;/</span>  
        Pass
        <span className='text-red-500'>OP/ &gt;</span> 
        </div>
      <ul >
        <li className='flex gap-4'>
            <a href="/" className=" hover:font-bold">Home</a>
            <a href='/about' className=" hover:font-bold">About</a>
            <a href='/contact' className="hover:font-bold">Contact</a>
        </li>
      </ul>
      </div>
    </nav>
  )
}

export default Navbar
