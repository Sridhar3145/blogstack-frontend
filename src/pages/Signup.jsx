import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
 const [input, setInput] = useState(
  {
   name: "",
   email: "",
   password: ""
  }
 );
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");
 const navigate = useNavigate();

 const handleChange = (e) => {

  setInput({ ...input, [e.target.name]: e.target.value })
 }

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(input)
   })
   const signUpData = await res.json();
   console.log(signUpData);

   if (!res.ok) {
    throw new Error(signUpData.msg || "Signup failed");
   }
   setError("");
   setSuccess("SignUp Successfully")

   setTimeout(() => {
    navigate('/login')
   }, 3000)

  } catch (error) {
   setError(error.message);
   setTimeout(() => {
    setError("");
   }, 5000);
  }
 }

 return (
  <div className='bg-blue-400 w-full max-w-md rounded-2xl mx-auto min-h-[50vh]  mt-20 py-7 text-white '>

   <form onSubmit={handleSubmit}>
    <div className='flex justify-center items-center flex-col gap-8'>
     <div className='text-center'>
      <h1 className=' text-2xl text-white font-extrabold'>Create Your Account</h1>
      <p>Join us and start your journey</p>
     </div>
     <div className='flex flex-col space-y-2 w-full px-8'>

      <label>Name</label>
      <input type="text" name='name' placeholder='Name' className='w-full border focus:ring-1 focus:outline-none px-4 py-2 rounded-lg' value={input.name} onChange={handleChange} />
     </div>
     <div className='flex flex-col space-y-2 w-full px-8'>

      <label>Email</label>
      <input type="email" name='email' placeholder='email' className='w-full border focus:ring-1 focus:outline-none px-4 py-2 rounded-lg' value={input.email} onChange={handleChange} />
     </div>
     <div className='flex flex-col space-y-2 w-full px-8'>

      <label>Password</label>
      <input type="password" name='password' placeholder='Password' className='w-full border focus:ring-1 focus:outline-none px-4 py-2 rounded-lg' value={input.password} onChange={handleChange} />
     </div>

     {error && <p className='text-red-500 font-medium'>{error}</p>}
     {success && <p className='text-green-400 font-medium'>{success}</p>}

     <div className='w-full px-8'>
      <button type='submit' className='border border-white py-3 w-full md:max-w-sm rounded-lg mb-8 hover:scale-105 bg-white text-blue-600 transition-all font-medium'>Signup</button>
     </div>


    </div>
   </form>

   <div className='text-center'>
    <p>
     Already have an account?{" "}
     <Link to="/login" className='hover:underline transition-all text-black'>Login</Link>
    </p>
   </div>

  </div>

 )
}

export default Signup