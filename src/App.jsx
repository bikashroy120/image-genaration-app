import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import Navber from "./components/Navber"
import CreactPost from "./pages/CreactPost"
import Home from "./pages/Home"
import Interview from "./pages/Interview"
import ProductDec from "./pages/ProductDec"
import TextGtp from "./pages/TextGTP"
import Translates from "./pages/Translates"

function App() {


  return (
    <BrowserRouter>
      <Navber />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-83px)]">
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/creact-post" element={<CreactPost />} />
            <Route path="/product" element={<ProductDec />} />
            <Route path="/text" element={<TextGtp />} />
            <Route path="/translates" element={<Translates />} />
            <Route path="/interview" element={<Interview />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
