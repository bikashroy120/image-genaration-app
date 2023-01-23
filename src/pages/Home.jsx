import React,{useState,useEffect} from 'react'
import Card from '../components/Card';
import FormFiled from '../components/FormField'
import Loader from '../components/Loader';
import FaPen from "react-icons/fa";

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

  return (
    <section className='max-w-7xl mx-auto'>
        <div>
            <h1 className=' font-extrabold text-[#222328] text-[42px]'>TechDSF Global Branding Development & Cyber Security Solutions Company</h1>
            <p className='mt-2 text-[#666e75] text-[16px]'>Welcome to Techdsf Software Company Bangladesh, one of the best software companies in Bangladesh. Tech DSF was founded in 2020. Now it is the largest software company in North Bengal. After successfully delivering many web & mobile applications, Tech DSF is now aimed to outsource skilled resources to fulfill any IT needs.</p>
        </div>
        <div className=' text-center mt-8'>
            <h2 className='text-[25px] font-inter font-semibold'>Examples</h2>
            <p>Explore what's possible with some example applications</p>
        </div>

      <div>
          <div>
            <div>
                <FaPen />
            </div>
          </div>
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