import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/Tech DSF-04.png"

const Navber = () => {
  return (
    <header className="w-full flex items-center justify-between bg-white sm:px-8 px-4  border-b border-b-[#e6ebf4]">
    <Link to={"/"}>
      <img src={logo} alt="" className="w-20 object-contain" />
    </Link>
    <div className='md:flex items-center gap-3 hidden '>
    <Link to={"/creact-post"} className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
      Create
    </Link>
    <Link to={"/product"} className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
      Product dec
    </Link>
    <Link to={"/text"} className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
      Text gtp
    </Link>
    </div>
</header>
  )
}

export default Navber

