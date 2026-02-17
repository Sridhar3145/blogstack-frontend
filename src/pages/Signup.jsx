import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

 const [input, setInput] = useState({
  name: "",
  email: "",
  password: ""
 })

 const [errors, setErrors] = useState({})
 const [success, setSuccess] = useState("")
 const navigate = useNavigate()

 const validate = () => {
  const newErrors = {}

  if (!input.name.trim()) {
   newErrors.name = "Name is required"
  }

  if (!input.email.trim()) {
   newErrors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
   newErrors.email = "Invalid email format"
  }

  if (!input.password.trim()) {
   newErrors.password = "Password is required"
  } else if (input.password.length < 6) {
   newErrors.password = "Password must be at least 6 characters"
  }

  return newErrors
 }

 const handleChange = (e) => {
  setInput({ ...input, [e.target.name]: e.target.value })
  setErrors({ ...errors, [e.target.name]: "" })
 }

 const handleSubmit = async (e) => {
  e.preventDefault()

  const validationErrors = validate()

  if (Object.keys(validationErrors).length > 0) {
   setErrors(validationErrors)
   return
  }

  try {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
   })

   const data = await res.json()

   if (!res.ok) {
    throw new Error(data.msg || "Signup failed")
   }

   setSuccess("Signup Successful")
   setInput({ name: "", email: "", password: "" })
   setErrors({})

   setTimeout(() => {
    navigate('/login')
   }, 2000)

  } catch (err) {
   setErrors({ api: err.message })
  }
 }

 return (
  <div className='bg-blue-400 w-full max-w-md rounded-2xl mx-auto min-h-[50vh] mt-20 py-7 text-white'>

   <form onSubmit={handleSubmit}>
    <div className='flex justify-center items-center flex-col gap-6 space-y-3'>

     <div className='text-center'>
      <h1 className='text-2xl font-extrabold'>Create Your Account</h1>
      <p>Join us and start your journey</p>
     </div>

     <div className='flex flex-col w-full px-8'>
      <label>Name</label>
      <input
       type="text"
       name="name"
       value={input.name}
       onChange={handleChange}
       className={`w-full px-4 py-2 rounded-lg border  text-white focus:outline-none ${errors.name ? "border-2 border-red-500" : "border"}`}
      />
      {errors.name && <p className='text-red-500 text-sm mt-1 transition-all'>{errors.name}</p>}
     </div>

     <div className='flex flex-col w-full px-8'>
      <label>Email</label>
      <input
       type="email"
       name="email"
       value={input.email}
       onChange={handleChange}
       className={`w-full px-4 py-2 rounded-lg text-white border focus:outline-none ${errors.email ? "border-2 border-red-500" : "border"}`}
      />
      {errors.email && <p className='text-red-500 text-sm mt-1 transition-all'>{errors.email}</p>}
     </div>

     <div className='flex flex-col w-full px-8'>
      <label>Password</label>
      <input
       type="password"
       name="password"
       value={input.password}
       onChange={handleChange}
       className={`w-full px-4 py-2 rounded-lg text-white border focus:outline-none ${errors.password ? "border-2 border-red-500" : "border"}`}
      />
      {errors.password && <p className='text-red-500 text-sm mt-1 transition-all'>{errors.password}</p>}
     </div>

     {errors.api && <p className='text-red-500 text-lg'>{errors.api}</p>}
     {success && <p className='text-black text-lg'>{success}</p>}

     <div className='w-full px-8'>
      <button
       type='submit'
       className='py-3 w-full rounded-lg bg-white text-blue-600 font-medium hover:scale-105 transition'
      >
       Signup
      </button>
     </div>

    </div>
   </form>

   <div className='text-center mt-4'>
    <p>
     Already have an account?{" "}
     <Link to="/login" className='hover:underline text-black'>Login</Link>
    </p>
   </div>

  </div>
 )
}

export default Signup
