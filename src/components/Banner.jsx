import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import BannerImage from '../assets/homepagg.jpg';

const Banner = () => {
  const bannerRef = useRef(null);
  const h1Ref = useRef(null);
  const pRef = useRef(null);
  const addressRef = useRef(null);
  const phoneRef = useRef(null);
  const searchBarRef = useRef(null);
  const buttonRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [visible, setVisible] = useState({
    h1: false, p: false, address: false, phone: false, searchBar: false, button: false
  });

  const navigate = useNavigate();

  // Animate elements
  useEffect(() => {
    const delay = (key, time) => setTimeout(() => setVisible(v => ({ ...v, [key]: true })), time);
    delay('h1', 300); delay('p', 500); delay('address', 1000); delay('phone', 1000);
    delay('searchBar', 1200); delay('button', 1500);

    const banner = bannerRef.current;
    if (banner) {
      banner.classList.add('opacity-0', 'translate-y-8');
      setTimeout(() => {
        banner.classList.remove('opacity-0', 'translate-y-8');
        banner.classList.add('opacity-100', 'translate-y-0');
      }, 100);
    }
  }, []);

  // Fetch all categories (destinations)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/category/get-all-category`, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
      .then(res => setDestinations(res.data.category || []))
      .catch(err => console.error("Category fetch error:", err.message));
  }, []);

  // Handle search and redirect
  const handleSearch = () => {
    const match = destinations.find(dest =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match?.slug) {
      navigate(`/rooms/${match.slug}`);
    }   else {
      navigate(`/rooms/${destinations.slug}`);;
    }
  };

  return (
    <div className="fixed w-full min-h-screen md:h-[700px] bg-cover bg-center relative" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="absolute inset-0 bg-black opacity-35"></div>
      <div ref={bannerRef} className="relative z-10 flex flex-col items-center justify-center min-h-screen md:h-full text-white px-4 transition-all duration-1000 ease-out opacity-0 translate-y-8">
        <h1 ref={h1Ref} className={`text-2xl md:text-4xl font-bold mb-2 text-center transition-all duration-700 ${visible.h1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          Welcome to Our Hotel
        </h1>
        <p ref={pRef} className={`text-base md:text-lg mb-4 text-center transition-all duration-700 ${visible.p ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          Experience luxury comfort and elegance at every stay—your perfect getaway awaits at VibeNext Hotels.
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 mb-4">
          <div ref={addressRef} className={`flex items-center space-x-2 justify-center transition-all duration-700 ${visible.address ? 'opacity-100 -translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <FaMapMarkerAlt className="text-xl" />
            <span className="text-sm md:text-base">123 Hotel St, City, Country</span>
          </div>
          <div ref={phoneRef} className={`flex items-center space-x-2 justify-center transition-all duration-700 ${visible.phone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FaPhoneAlt className="text-xl" />
            <span className="text-sm md:text-base">9302004528</span>
          </div>
        </div>

        {/* Search bar */}
        <div ref={searchBarRef} className={`w-full max-w-xl sm:max-w-2xl md:max-w-3xl bg-white p-2 sm:p-4 rounded-lg shadow-lg flex flex-row items-center space-x-4 mt-6 transition-all duration-700 ${visible.searchBar ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination"
            className="flex-grow p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
          />
          <button
            ref={buttonRef}
            onClick={handleSearch}
            className={`px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition transition-all duration-700 ${visible.button ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-12'}`}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
