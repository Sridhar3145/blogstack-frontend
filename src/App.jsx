import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from "./components/layout/Navbar"
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import Signup from './pages/Signup'
import BlogExtendView from './pages/BlogExtendView'
import Login from './pages/Login'
import PendingApproval from './pages/PendingApproval'
import MyBlogs from './pages/MyBlogs'



function App() {


  return (
    <div className='flex flex-col min-h-screen'>
      <Router>

        <Navbar />

        <main className="grow">

          <Routes>
            <Route path='/pending' element={<PendingApproval />} />
            <Route path='/' element={<Home />} />
            <Route path='/createblog' element={<CreateBlog />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path="/blog/:slug" element={<BlogExtendView />} />
            <Route path='/myblogs' element={<MyBlogs />} />



          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
