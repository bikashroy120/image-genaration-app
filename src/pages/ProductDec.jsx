import React, { useRef } from 'react'
import { useState } from 'react'
import send from "../assets/send.svg"
import axios from "axios"
import { Bars } from 'react-loader-spinner'
import user from "../assets/user.svg"
import bot from "../assets/bot.svg"
import { useEffect } from 'react'

const ProductDec = () => {
  const [prompt,setprompt] = useState('')
  const [data,setData] = useState([])
  const [lodder,setLoder] = useState(false)
  const scrolRef = useRef(null)

  const handelSubmit = (e)=>{
    e.preventDefault()
    setLoder(true)
    axios.post("http://localhost:5000/product-dec",{prompt})
    .then((res)=>{
      console.log(res.data.bot.trim())
      setData([...data,{first:prompt,last:res.data.bot.trim()}])
      setLoder(false)
      scrollSection()
    })
    setprompt("")
  }



  const scrollSection = () => {
    window.scrollTo({
      top: scrolRef.current.offsetTop,
      behavior: "smooth",
    });
    console.log("hello")
  };

  console.log(scrolRef)

  return (
    <div className='w-full h-screen bg-[#343541] pb-20 overflow-y-scroll px-5'>
      <div>
        {
        data && data.map((item,i)=>{
            return(
              <div className=' text-white' key={i}>
                <div className=' py-5 px-10'>
                  <div className='flex items-center gap-3 max-w-[700px] mx-auto'>
                    <img src={user} alt="" className='w-[40px]'  />
                    <h2>{item.first}</h2>
                  </div>
                </div>
                <div className=' mt-3 py-5 bg-[#444654] px-10' ref={scrolRef}>
                    <div className='flex items-start gap-3 max-w-[700px] mx-auto'>
                      <div className='w-[7%]'>
                      <img src={bot} alt="" className='w-[40px]' />
                      </div>
                      <div className='w-[90%]'>
                        <h4>{item.last}</h4>
                      </div>
                    </div>
                </div>
              </div>
            )
          })
        }
                          {
      lodder ? (<div className='flex items-center justify-center mt-3'>
        <Bars
          height="50"
          width="50"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
/>
      </div>):(null)
    }
      </div>
      <form onSubmit={handelSubmit} className='flex items-center max-w-[900px] absolute bottom-5 shadow-md left-[20%] w-[100%] gap-1 mx-auto bg-[#40414F] px-5'>
        <input type="text" value={prompt} onChange={(e)=>setprompt(e.target.value)} className='w-full font-normal text-[25px] outline-none border-none bg-transparent text-white' />
        <button type='submit' className='py-2'><img className='w-[35px] h-[35px]' src={send} alt="hello" /> </button>
      </form>
    </div>
  )
}

export default ProductDec;