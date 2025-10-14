import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import{ useAuth } from '../context/UserContext';
import BannerImage from './components/assets/homepagg.jpg';

function Login() {
  const[email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setAuth } = useAuth(); // Access setAuth from UserContext

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/auth/login`, {
        email,
        password,
      });

   toast.success('Login successful!')
   setAuth({
        user: response.data.user,
        token: response.data.token,
      })

      localStorage.setItem('auth', JSON.stringify({
        user: response.data?.user,
        token: response.data?.token,
      }));

      setError(''); // Clear any previous error messages
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
      console.log(response.data.user)
      console.log(response.data.token)      
    navigate('/'); // Redirect to home page after successful login
    
  } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      toast.error('Login failed')
      console.log(err)
    }
  }
  
     const h2Ref = useRef(null);
      const [h2Visible, setH2Visible] = useState(false);
    
      useEffect(() => {
        const node = h2Ref.current;
        if (!node) return;
        const observer = new window.IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setH2Visible(true);
              observer.disconnect();
            }
          },
          { threshold: 0.3 }
        );
        observer.observe(node);
        return () => observer.disconnect();
      }, []);

  return (
    <div
          className="flex items-center justify-center min-h-screen w-full bg-cover bg-center fixed"
       style={{ backgroundImage: `url(${BannerImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-45"></div>
          <div ref={h2Ref} className={`relative z-10 w-full max-w-xs sm:max-w-sm mt-12 md:max-w-md lg:max-w-sm bg-transparent backdrop-blur-sm shadow-md rounded-lg p-4 sm:p-6 border border-gray-300 mx-2transition-all duration-700
              ${h2Visible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-y-16 scale-95'}`}>
        <h2 className='text-2xl font-bold text-white mb-6 text-center'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <input
              type='text'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)} 
              className='bg-transparent shadow appearance-none w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline border-b border-white'
              placeholder='Email'
            />
          </div>

          <div className='mb-6'>
            <input
              type='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}   
              className=' bg-transparent shadow appearance-none w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline border-b border-white'
              placeholder='Password'
            />
          </div>

          <div className='mb-5'>
            <input
              type='checkbox'
              id='remember'
              className='mr-2 leading-tight'
            />
            <label className='text-white text-sm font-bold' htmlFor='remember'>
              Remember Me
            </label>    
          </div>
          <div className='flex flex-col items-center justify-center items-start space-y-2'>
           <button
                onClick={handleSubmit}
                 className='w-[100%] bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                  >
                  Login
                 </button>
                 <a className='text-sm text-white hover:text-blue-300'
              href='/forgot-password'>
               Forgot Password?
             </a>
            </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className='mt-4 text-center'>
            <p className='text-white text-sm font bold'>
              Don't have an account? <a href='Register' className='text-blue-500 font-bold  hover:text-blue-800'>Sign Up</a>
            </p>  </div>
        </form>
      </div>
    </div>
  );
};

export default Login
