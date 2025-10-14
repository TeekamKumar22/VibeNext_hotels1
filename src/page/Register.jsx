import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BannerImage from './components/assets/homepagg.jpg';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/auth/register`, {
        name,
        email,
        password,
      });
      toast.success('Registration successful!');
      setError('');
      setName('');
      setEmail('');
      setPassword('');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      toast.error('Registration failed');
    }
  };

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
      <div ref={h2Ref} className={`relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md mt-9 lg:max-w-sm bg-transparent backdrop-blur-sm shadow-md rounded-lg p-4 sm:p-6 border border-gray-300 mx-2transition-all duration-700
          ${h2Visible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-y-16 scale-95'}`}>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-7">
            <input
              type="text"
              id="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="shadow appearance-none bg-transparent w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline border-b border-white"
              placeholder="Name"
            />
          </div>
          <div className="mb-7">
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="shadow appearance-none bg-transparent w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline border-b border-white"
              placeholder="Email"
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="shadow appearance-none bg-transparent w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline border-b border-white"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="mt-7 text-center">
            <p className="text-gray-600 text-white text-sm font-bold">
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 hover:text-blue-800">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
