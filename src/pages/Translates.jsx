import React, { useState } from 'react'
import { Bars } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import { getRandomPromptProduct } from '../utils';
import user from "../assets/user.svg"
import bot from "../assets/bot.svg"
import axios from 'axios';
import Select from 'react-select';

const Translates = () => {
    const navigate = useNavigate();
      const [prompt,setprompt] = useState('')
      const [data,setData] = useState([])
    const [form, setForm] = useState({
      prompt: '',
    });

    const options = [
        { value: 'Afrikaans', label: 'Afrikaans' },
        { value: 'Akan', label: 'Akan' },
        { value: 'Albanian', label: 'Albanian' },
        { value: 'Amharic', label: 'Amharic' },
        { value: 'Arabic', label: 'Arabic' },
        { value: 'Armenian', label: 'Armenian' },
        { value: 'Assamese', label: 'Assamese' },
        { value: 'Aymara', label: 'Aymara' },
        { value: 'Azerbaijani', label: 'Azerbaijani' },
        { value: 'Bambara', label: 'Bambara' },
        { value: 'Bangla', label: 'Bangla' },
        { value: 'Basque', label: 'Basque' },
        { value: 'Belarusian', label: 'Belarusian' },
        { value: 'Bhojpuri', label: 'Bhojpuri' },
        { value: 'Bosnian', label: 'Bosnian' },
        { value: 'Bulgarian', label: 'Bulgarian' },
        { value: 'Burmese', label: 'Burmese' },
        { value: 'Catalan', label: 'Catalan' },
        { value: 'Cebuano', label: 'Cebuano' },
        { value: 'Corsican', label: 'Corsican' },
        { value: 'Croatian', label: 'Croatian' },
        { value: 'Czech', label: 'Czech' },
        { value: 'Danish', label: 'Danish' },
        { value: 'Divehi', label: 'Divehi' },
        { value: 'Dogri', label: 'Dogri' },
        { value: 'English', label: 'English' },
        { value: 'Esperanto', label: 'Esperanto' },
        { value: 'Finnish', label: 'Finnish' },
        { value: 'French', label: 'French' },
        { value: 'Guarani', label: 'Guarani' },
        { value: 'Nepali', label: 'Nepali' },
        { value: 'Hindi', label: 'Hindi' },
      ];




    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    
      
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (form.prompt) {
        setLoading(true)
        axios.post("http://localhost:8080/api/v1/dalle/translates",{prompt: `Translate this into:${selectedOption} ${form.prompt}`})
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
        <h1 className="font-extrabold text-[#222328] text-[32px]">English to other languages</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Translates English text into French, Spanish and Japanese.</p>
      </div>

      <form className="mt-7" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
         <div>
            <p className='text-[15px] mb-2'>Select Language</p>
            <select  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3" name="cars" id="cars" value={selectedOption} onChange={(e)=>setSelectedOption(e.target.value)}>
              {options.map((item,i)=>{
                return(
                  <option key={i} value={item.value}>{item.label}</option>
                )
              })}
            </select>
          </div>
          <FormField
            labelName="Enter any Text"
            type="text"
            name="prompt"
            placeholder="Enter Text…"
            value={form.prompt}
            handleChange={handleChange}
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

export default Translates;