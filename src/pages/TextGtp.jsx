import React, { useState } from 'react'
import { Bars } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import { getRandomPrompt } from '../utils';
import user from "../assets/user.svg"
import bot from "../assets/bot.svg"
import axios from 'axios';

const CreactPost = () => {
    const navigate = useNavigate();
      const [prompt,setprompt] = useState('')
      const [data,setData] = useState([])
    const [form, setForm] = useState({
      prompt: '',
    });
    console.log(data)
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (form.prompt) {
        setLoading(true)
        axios.post("http://localhost:8080/api/v1/dalle/text",{prompt: form.prompt})
        .then((res)=>{
          console.log(res.data.bot)
          setData([...data,{first:prompt,last:res.data.bot}])
          setLoading(false)
          typeText(res.data.bot)
        })
        setprompt("")
      } else {
        alert('Please provide proper prompt');
      }
    };

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
  
    //   if (form.prompt && form.photo) {
    //     setLoading(true);
    //     try {
    //       const response = await fetch('http://localhost:8080/api/v1/post', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ ...form }),
    //       });
  
    //       await response.json();
    //       alert('Success');
    //       navigate('/');
    //     } catch (err) {
    //       alert(err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   } else {
    //     alert('Please generate an image with proper details');
    //   }
    // };

    function typeText(text) {
      let index = 0
  
      let interval = setInterval(() => {
          if (index < text.length) {
              document.getElementById('pp').innerHTML += text.charAt(index)
              index++
          } else {
              clearInterval(interval)
          }
      }, 20)
  }


  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Text completion</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate and edit text</p>
      </div>

      <form className="mt-7 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="submit"
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {/* <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div> */}

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
                <div className=' mt-3 py-5 bg-[#444654] px-10'>
                    <div className='flex items-start gap-3 max-w-[700px] mx-auto'>
                      <div className='w-[7%]'>
                      <img src={bot} alt="" className='w-[40px]' />
                      </div>
                      <div className='w-[90%]'>
                        <h4 id='pp'></h4>
                      </div>
                    </div>
                </div>
              </div>
            )
          })
        }
                          {
      loading ? (<div className='flex items-center justify-center mt-3'>
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

      </form>
    </section>
  )
}

export default CreactPost