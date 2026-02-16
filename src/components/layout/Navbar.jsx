
import bslogo from '../../assets/bslogo1.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'


const Navbar = () => {
 const [toggleMenu, setToggleMenu] = useState(false)
 const [username, setUsername] = useState("");
 const [pendingCount, setPendingCount] = useState(0);

 const navigate = useNavigate();
 const location = useLocation();


 const role = localStorage.getItem("role");
 const isAdmin = role === "admin";
 const isLogin = localStorage.getItem("token")

 useEffect(() => {
  const fetchPendingBlogs = async () => {
   if (!isAdmin) return;

   try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${import.meta.env.VITE_API_URL}//blog/pending`, {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    });

    const data = await res.json();
    setPendingCount(data.length);

   } catch (error) {
    console.log("Pending fetch error", error);
   }
  };

  fetchPendingBlogs();
 }, [isAdmin, location]);




 useEffect(() => {

  const storedUser = localStorage.getItem("username");
  setUsername(storedUser || "");

 }, []);

 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem('role')
  window.dispatchEvent(new Event("storage"));
  navigate("/login");
 };

 return (
  <>

   <nav className='bg-blue-400 rounded-lg'>
    <div className='flex justify-between items-center md:px-12  px-3 '>
     <div className=''>
      <img src={bslogo} alt="logo" className=' md:w-20 md:h-20 w-16 h-16' />
     </div>
     <div className='md:hidden'>

      <button
       onClick={() => setToggleMenu(!toggleMenu)}
       className="text-2xl font-bold"
      >
       ☰
      </button>
     </div>
     <div className='md:flex gap-10 hidden'>
      {isAdmin && (
       <Link
        to="/pending"
        className="relative hover:scale-110 transition-all text-white"
       >
        Pending Approval

        {pendingCount > 0 && (
         <span className="absolute -top-2 -right-4 bg-red-600 text-white text-[10px] min-w-4.5 h-4.5 flex items-center justify-center rounded-full px-1">
          {pendingCount}
         </span>
        )}
       </Link>
      )}


      <Link to="/" className='  hover:scale-110 transition-all  text-white'>Home</Link>
      <Link to="/createblog" className='hover:scale-110 transition-all  text-white'>CreateBlog</Link>
      {
       isLogin &&
       <Link to="/myblogs" className='hover:scale-110 transition-all  text-white'>My Blogs</Link>
      }
      <Link to="/signup" className='hover:scale-110 transition-all text-white'>Signup</Link>
      {!username ? (
       <Link
        to="/login"
        className='hover:scale-110 transition-all text-white'
       >
        Login
       </Link>
      ) : (
       <button
        onClick={handleLogout}
        className='hover:scale-110 transition-all text-white'
       >
        Logout
       </button>
      )}
     </div>
    </div>
   </nav>
   {
    toggleMenu &&
    <div className=' absolute top-16   mt-1 bg-blue-400 rounded-lg z-30 border border-white'>

     <div className='flex flex-col text-center  md:hidden gap-6 p-6'>
      {
       isAdmin &&
       <Link to="/pending" className='  hover:scale-110 transition-all  text-white' onClick={() => setToggleMenu(false)}>Pending Approval</Link>
      }
      <Link to="/" className='  hover:scale-110 transition-all  text-white' onClick={() => setToggleMenu(false)}>Home</Link>
      <Link to="/createblog" className='hover:scale-110 transition-all  text-white' onClick={() => setToggleMenu(false)}>CreateBlog</Link>
      {
       isLogin &&
       <Link to="/myblogs" className='hover:scale-110 transition-all  text-white'>My Blogs</Link>
      }
      <Link to="/signup" className='hover:scale-110 transition-all text-white' onClick={() => setToggleMenu(false)}>Signup</Link>
      {!username ? (
       <Link
        to="/login"
        className='hover:scale-110 transition-all text-white'
        onClick={() => setToggleMenu(false)}
       >
        Login
       </Link>
      ) : (
       <button
        onClick={() => {
         handleLogout();
         setToggleMenu(false);
        }}
        className='hover:scale-110 transition-all text-white'

       >
        Logout
       </button>
      )}
     </div>
    </div>
   }
  </>

 )
}

export default Navbar