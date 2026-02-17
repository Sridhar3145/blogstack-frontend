// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// const Login = () => {
//  const [input, setInput] = useState(
//   {
//    email: "",
//    password: ""
//   }
//  );
//  const [error, setError] = useState("");
//  const [success, setSuccess] = useState("");
//  const navigate = useNavigate();

//  const handleChange = (e) => {

//   setInput({ ...input, [e.target.name]: e.target.value })
//  }
//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//      "Content-Type": "application/json",
//     },
//     body: JSON.stringify(input)
//    })
//    const loginData = await res.json();
//    console.log(loginData);

//    if (!res.ok) {
//     throw new Error(loginData.msg || "Login failed");
//    }
//    localStorage.setItem('token', loginData.token);
//    localStorage.setItem("username", loginData.name);
//    localStorage.setItem("email", loginData.email);
//    localStorage.setItem('role', loginData.role);
//    console.log(localStorage.setItem('role', loginData.Role));


//    setError("");
//    setSuccess("Login Successfully")
//    window.dispatchEvent(new Event("storage"));

//    setTimeout(() => {
//     navigate('/')
//    }, 3000)

//   } catch (error) {
//    setError(error.message);
//    setTimeout(() => {
//     setError("");
//    }, 5000);
//   }
//  }
//  return (
//   <div className='bg-blue-400 w-full max-w-md rounded-2xl mx-auto min-h-[50vh]  mt-20 py-7 text-white '>

//    <form onSubmit={handleSubmit} >
//     <div className='flex justify-center items-center flex-col gap-8'>
//      <div className='text-center'>
//       <h1 className=' text-2xl text-white font-extrabold'>Welcome Back</h1>
//       <p>Please login to your account</p>
//      </div>
//      <div className='flex flex-col space-y-2 w-full px-8'>

//       <label>Email</label>
//       <input type="email" placeholder='email' name='email' className='w-full border focus:ring-1 focus:outline-none px-4 py-2 rounded-lg' value={input.email} onChange={handleChange} />
//      </div>
//      <div className='flex flex-col space-y-2 w-full px-8'>

//       <label>Password</label>
//       <input type="password" name='password' placeholder='Password' className='w-full border focus:ring-1 focus:outline-none px-4 py-2 rounded-lg' value={input.password} onChange={handleChange} />
//      </div>
//      {error && <p className='text-red-500 font-medium'>{error}</p>}
//      {success && <p className='text-green-400 font-medium'>{success}</p>}

//      <div className='w-full px-8'>

//       <button type='submit' className='border border-white py-3 w-full md:max-w-sm rounded-lg mb-8 hover:scale-105 bg-white text-blue-600 font-medium transition-all '>Login</button>
//      </div>


//     </div>
//    </form>

//    <div className='text-center'>
//     <p>
//      Don't have an account?{" "}
//      <Link to="/signup" className='hover:underline transition-all text-black'>Signup</Link>
//     </p>
//    </div>

//   </div>

//  )
// }

// export default Login

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

 const [input, setInput] = useState({
  email: "",
  password: ""
 })

 const [errors, setErrors] = useState({})
 const [success, setSuccess] = useState("")
 const navigate = useNavigate()

 const validate = () => {
  const newErrors = {}

  if (!input.email.trim()) {
   newErrors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
   newErrors.email = "Invalid email format"
  }

  if (!input.password.trim()) {
   newErrors.password = "Password is required"
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
   const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
   })

   const data = await res.json()

   if (!res.ok) {
    throw new Error(data.msg || "Login failed")
   }

   localStorage.setItem("token", data.token)
   localStorage.setItem("username", data.name)
   localStorage.setItem("email", data.email)
   localStorage.setItem("role", data.Role)

   window.dispatchEvent(new Event("storage"))

   setSuccess("Login Successful")
   setInput({ email: "", password: "" })
   setErrors({})

   setTimeout(() => {
    navigate("/")
   }, 1500)

  } catch (err) {
   setErrors({ api: err.message })
  }
 }

 return (
  <div className='bg-blue-400 w-full max-w-md rounded-2xl mx-auto min-h-[50vh] mt-20 py-7 text-white'>

   <form onSubmit={handleSubmit}>
    <div className='flex justify-center items-center flex-col gap-6 space-y-3'>

     <div className='text-center'>
      <h1 className='text-2xl font-extrabold'>Welcome Back</h1>
      <p>Please login to your account</p>
     </div>

     <div className='flex flex-col w-full px-8'>
      <label>Email</label>
      <input
       type="email"
       name="email"
       value={input.email}
       onChange={handleChange}
       className={`w-full px-4 py-2 rounded-lg focus:outline-none text-white border ${errors.email ? "border-2 border-red-500" : "border"}`}
      />
      {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
     </div>

     <div className='flex flex-col w-full px-8'>
      <label>Password</label>
      <input
       type="password"
       name="password"
       value={input.password}
       onChange={handleChange}
       className={`w-full px-4 py-2 rounded-lg focus:outline-none text-white border ${errors.password ? "border-2 border-red-500" : "border"}`}
      />
      {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
     </div>

     {errors.api && <p className='text-red-500 text-lg'>{errors.api}</p>}
     {success && <p className='text-black text-lg'>{success}</p>}

     <div className='w-full px-8'>
      <button
       type='submit'
       className='py-3 w-full rounded-lg bg-white text-blue-600 font-medium hover:scale-105 transition'
      >
       Login
      </button>
     </div>

    </div>
   </form>

   <div className='text-center mt-4'>
    <p>
     Don't have an account?{" "}
     <Link to="/signup" className='hover:underline text-black'>Signup</Link>
    </p>
   </div>

  </div>
 )
}

export default Login
