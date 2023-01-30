import React, { useState } from 'react'
import { Bars } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import {getRandomPromptquePrompts } from '../utils';
import user from "../assets/user.svg"
import bot from "../assets/bot.svg"
import axios from 'axios';

const Interview = () => {
    const navigate = useNavigate();
      const [prompt,setprompt] = useState('')
      const [data,setData] = useState([])
    const [form, setForm] = useState({
      prompt: '',
    });


    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPromptquePrompts(form.prompt);
        setForm({ ...form, prompt: randomPrompt });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (form.prompt) {
        setLoading(true)
        axios.post("http://localhost:8080/api/v1/dalle/interview",{prompt: form.prompt})
        .then((res)=>{
          console.log(res.data.bot.trim())
          setData([{first:form.prompt,last:res.data.bot},...data])
          setLoading(false)
        })
        setprompt("")
      } else {
        alert('Please provide proper prompt');
      }
    };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Interview questions</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Create interview questions.</p>
      </div>

      <form className="mt-7" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Enter Questions"
            type="text"
            name="prompt"
            placeholder="Enter questions"
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
      <div>
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
        {
        data && data.map((item,i)=>{
            return(
              <div className='pt-3 text-white' key={i}>
                <div className='pt-3 bg-slate-400'>
                  <div className='flex items-center gap-3 max-w-[700px] mx-auto p-4'>
                    <img src={user} alt="" className='w-[40px]'  />
                    <h2>{item.first}</h2>
                  </div>
                </div>
                <div className='py-5 bg-[#45464a] px-10'>
                    <div className='flex items-start gap-3 max-w-[700px] mx-auto'>
                      <div className='md:w-[90%] ' >

                        <div
                        contentEditable={true}
                            dangerouslySetInnerHTML={{__html: item.last.replaceAll("\n", "<br/>")}}
                          />
                      </div>
                    </div>
                </div>
              </div>
            )
          })
        }
      </div>

      </form>
    </section>
  )
}

export default Interview