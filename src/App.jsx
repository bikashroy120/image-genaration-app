import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import Navber from "./components/Navber"
import CreactPost from "./pages/CreactPost"
import Home from "./pages/Home"
import ProductDec from "./pages/ProductDec"
import TextGtp from "./pages/TextGTP"

function App() {


  return (
    <BrowserRouter>
      <Navber />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/creact-post" element={<CreactPost />} />
            <Route path="/product" element={<ProductDec />} />
            <Route path="/text" element={<TextGtp />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
