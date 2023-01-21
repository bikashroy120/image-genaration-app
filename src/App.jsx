import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import {logo} from "./assets"
import CreactPost from "./pages/CreactPost"
import Home from "./pages/Home"

function App() {


  return (
    <BrowserRouter>
      <header className="w-full flex items-center justify-between bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
          <Link to={"/"}>
            <img src={logo} alt="" className="w-28 object-contain" />
          </Link>
          <Link to={"/creact-post"} className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
            Create
          </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/creact-post" element={<CreactPost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
