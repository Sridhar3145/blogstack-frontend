import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import bslogo from '../../assets/bslogo1.png'

const Footer = () => {
 return (
  <footer className="bg-blue-500 text-white mt-20">
   <div className="max-w-6xl mx-auto px-3 py-12 grid md:grid-cols-4 gap-20">

    <div className="">
     <img src={bslogo} alt="logo" />
    </div>

    <div>
     <h2 className="text-xl font-bold mb-3">BlogStack</h2>
     <p className="text-sm text-blue-100">
      A multi-user blogging platform where creators can publish ideas
      and get them reviewed before going live.
     </p>
    </div>

    <div>
     <h3 className="font-semibold mb-3">Quick Links</h3>
     <ul className="space-y-2 text-blue-100 text-sm">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/createblog">Create Blog</Link></li>
      <li><Link to="/myblogs">My Blogs</Link></li>
      <li><Link to="/signup">Signup</Link></li>
     </ul>
    </div>

    <div>
     <h3 className="font-semibold mb-3">Follow Us</h3>
     <div className="flex gap-4 text-xl">
      <FaGithub className="cursor-pointer hover:text-black" />
      <FaLinkedin className="cursor-pointer hover:text-blue-300" />
      <FaInstagram className="cursor-pointer hover:text-pink-300" />
     </div>
    </div>

   </div>

   <div className="border-t border-blue-400 text-center py-4 text-sm text-blue-100">
    © {new Date().getFullYear()} BlogStack. All rights reserved.
   </div>
  </footer>
 );
};

export default Footer;
