import React,{useState,useEffect} from 'react'
import Card from '../components/Card';
import FormFiled from '../components/FormField'
import Loader from '../components/Loader';
import {FaPen,FaImages} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return (
        data.map((post) => <Card key={post._id} {...post} />)
      );
    }
  
    return (
      <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
    );
  };

const Home = () => {
    const [Loading,setLoading] = useState(false)
    const [allPosts,setAllPosts] = useState(null)
    const [searchText,setSearchText] = useState("")
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);
    const navigate = useNavigate()

    const navData = [
      {
        icon:<FaPen />,
        title:"Text completion",
        sub:"Generate and edit text",
        link:"/text",
        bg:'#ef4146'
      },
      {
        icon:<FaImages />,
        title:"Image generationBeta",
        sub:"Generate and edit images",
        link:"/creact-post",
        bg:"#dd5ce5",
      },
      {
        icon:<FaPen />,
        title:"Ad from product description",
        sub:"Turn a product description into ad copy.",
        link:"/product",
        bg:"#5436da",
      },
      {
        icon:<FaPen />,
        title:"English to other languages",
        sub:"Translates English text into French, Spanish and Japanese.",
        link:"/translates",
        bg:"#F15459",
      },
      {
        icon:<FaPen />,
        title:"Interview questions",
        sub:"Create interview questions.",
        link:"/interview",
        bg:"#1DBE84",
      },
      {
        icon:<FaPen />,
        title:"Recipe creator (eat at your own risk)",
        sub:"Create a recipe from a list of ingredients.",
        link:"/recipe",
        bg:"#7840DD",
      },
    ]


    const fetchPosts = async () => {
      setLoading(true);
  
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPosts();
    }, []);

    const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
  
      setSearchTimeout(
        setTimeout(() => {
          const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
          setSearchedResults(searchResult);
        }, 500),
      );
    };

    const RouterHandeler = (link)=>{
      navigate(link);
    }

  return (
    <section className='max-w-7xl mx-auto'>
        <div>
            <h1 className=' font-extrabold text-[#222328] text-[20px] md:text-[42px]'>TechDSF Global Branding Development & Cyber Security Solutions Company</h1>
            <p className='mt-2 text-[#666e75] text-[16px]'>Welcome to Techdsf Software Company Bangladesh, one of the best software companies in Bangladesh. Tech DSF was founded in 2020. Now it is the largest software company in North Bengal. After successfully delivering many web & mobile applications, Tech DSF is now aimed to outsource skilled resources to fulfill any IT needs.</p>
        </div>
        <div className=' text-center mt-8'>
            <h2 className='text-[25px] font-inter font-semibold'>Examples</h2>
            <p>Explore what's possible with some example applications</p>
        </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10'>
        {navData.map((item,index)=>{
          return(
            <div key={index} onClick={()=>RouterHandeler(item.link)} className="bg-[#eeeeee] hover:shadow-md cursor-pointer  py-3 px-5 flex items-center gap-3 rounded-md">
            <div className={`w-[18%] text-white text-[25px] flex items-center justify-center rounded-md h-[70px]`} style={{background:`${item.bg}`}}>
                {item.icon}
            </div>
            <div className='w-[75%]'>
              <h2 className='text-[16px] md:text-[18px] font-semibold'>{item.title}</h2>
              <p className='text-[14px] md:text-[16px]'>{item.sub.slice(0,35)} {item.sub.length>35 ? "..." : ""}</p>
            </div>
          </div>
          )
        })}
      </div>

        <div className='mt-16'>
            <FormFiled 
              labelName="Search posts"
              type="text"
              name="text"
              placeholder="Search something..."
              value={searchText}
              handleChange={handleSearchChange}
            />
        </div>
        <div className="mt-10">
        {Loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home