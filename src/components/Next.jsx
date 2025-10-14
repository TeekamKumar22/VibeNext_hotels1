import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Next = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/post/allpost`, {
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0' }
    })
      .then(res => {
        setHotels(res.data.posts || res.data.post || []);
      })
      .catch(err => console.error('Error fetching hotels:', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % hotels.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hotels]);

  const handleRedirect = (link) => {
    if (link) navigate(link);
  };

  if (hotels.length < 2) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading hotels...
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-4 justify-center items-center mt-10 text-center">
      <h2 className="text-2xl font-bold mt-6 text-center">
        Plan Your Next Adventure
      </h2>
      <p className="text-gray-600 mt-3">
        Tailored travel experiences, top-rated stays and locations, seamless booking and itinerary suggestions
      </p>

      <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row gap-5 justify-center items-center">
        {/* First Image */}
        <div
          className="relative w-full md:w-[48%] h-60 cursor-pointer flex flex-col hover:scale-105 hover:shadow-lg shadow-gray-500 transition-transform duration-300"
        onClick={() => navigate(`/room/${hotels[currentIndex].slug}`)}>
          <img
            src={hotels[currentIndex].images}
            alt={`Hotel ${currentIndex + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-xs sm:text-sm">
            {hotels[currentIndex].hotelLocation}
          </div>
        </div>

        {/* Second Image */}
        <div
          className="relative w-full md:w-[50%] h-60 cursor-pointer flex flex-col hover:scale-105 hover:shadow-lg shadow-gray-500 transition-transform duration-300"
          onClick={() => navigate(`/room/${hotels[currentIndex +1].slug}`)}
        >
          <img
            src={hotels[(currentIndex + 1) % hotels.length].images}
            alt={`Hotel ${(currentIndex + 1) % hotels.length + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-xs sm:text-sm">
            {hotels[(currentIndex + 1) % hotels.length].hotelLocation }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Next;
