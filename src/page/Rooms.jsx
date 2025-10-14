import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  FaStarHalfAlt, FaStar, FaCity, FaShoppingBag,
  FaWater, FaGolfBall, FaMapMarkerAlt
} from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const Rooms = () => {
  const { slug } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/post/${slug}`, {
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0' }
    }).then(res => setRoomDetails(res.data.post || res.data.posts))
      .catch(err => console.error("Error:", err.message));
  }, []);

  useEffect(() => {
    if (roomDetails?.images?.length) setSelectedImage(roomDetails.images[0]);
  }, [roomDetails]);

  const getPlaceIcon = place => {
    const icons = {
      "Burj Khalifa": <FaCity className="text-indigo-600" />,
      "Burj Al Arab": <FaCity className="text-indigo-600" />,
      "Dubai Mall": <FaShoppingBag className="text-pink-600" />,
      "Mall of the Emirates": <FaShoppingBag className="text-pink-600" />,
      "Dubai Creek": <FaWater className="text-blue-600" />,
      "Al Jaddaf Waterfront": <FaWater className="text-blue-600" />,
      "Wild Wadi Waterpark": <FaWater className="text-blue-600" />,
      "Emirates Golf Club": <FaGolfBall className="text-blue-600" />
    };
    return icons[place] || <FaMapMarkerAlt className="text-gray-600" />;
  };

  return (
    <div className="p-4mt-9">
      {roomDetails ? (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
          <div className='flex flex-col md:flex-row gap-2 items-start md:items-center'>
            <h1 className='text-3xl mb-2 md:text-4xl font-playfair'>{roomDetails.title}</h1>
            <p className='text-xs text-gray-100 font-inter py1.5 px-2 bg-gray-900 rounded-full'>20% OFF</p>
          </div>
          <div className='mt-2'>
            <div className='flex items-center gap-2'>
              <FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
              <p className='ml-2'>1200+ reviews</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <MdLocationOn />
              {roomDetails.hotelLocation}
            </div>
          </div>
          <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <img src={selectedImage} alt="Main Room" className='w-full h-[16.5rem] object-cover rounded-lg shadow-lg' />
            <div className='grid grid-cols-2 gap-2'>
              {roomDetails.images.map((img, i) => (
                <img key={i} src={img} alt={`Room ${i + 1}`}
                  className={`w-full h-32 object-cover rounded-lg cursor-pointer ${selectedImage === img ? 'border-4 border-gray-400' : 'border-2 border-gray-300'}`}
                  onClick={() => setSelectedImage(img)} />
              ))}
            </div>
            <h2 className='text-xl text-gray-600 font-semibold'>{roomDetails.description}</h2>
            <h3 className='flex justify-end text-lg font-semibold'>Price: ${roomDetails.price}/night</h3>
          </div>

          <form className="max-w-6xl mx-auto mt-16 bg-gray-100 shadow-[0_0_20px_rgba(0,0,0,0.15)] p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-700 w-full">
              {["Check-In", "Check-Out"].map((label, i) => (
                <div key={i} className="flex flex-col">
                  <label htmlFor={label.toLowerCase().replace("-", "")} className="font-medium">{label}</label>
                  <input id={label.toLowerCase().replace("-", "")} type="date" required placeholder={label}
                    className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 mt-1.5 outline-none" />
                </div>
              ))}
              <div className="flex flex-col">
                <label htmlFor="guests" className="font-medium">Guests</label>
                <input id="guests" type="number" required min={1} max={4} placeholder="0"
                  className="max-w-20 rounded border border-gray-300 bg-gray-100 px-3 py-2 mt-1.5 outline-none" />
              </div>
            </div>
            <button type="submit" className="bg-gray-900 hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-24 py-3 md:py-4 text-base cursor-pointer">
              Check Availability
            </button>
          </form>

          <section className="mt-9 ml-2 space-y-6">
            {["Facilities", "Nearby Areas"].map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold mb-3">{section}</h2>
                {(roomDetails.nearAreas.length || roomDetails.facilities.length) ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {(section === "Facilities" ? roomDetails.facilities : roomDetails.nearAreas).map((place, idx) => (
                      <li key={idx} className="flex items-center p-2 gap-2">
                        {getPlaceIcon(place)}
                        <span className="text-sm font-medium text-gray-800">{place}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No {section.toLowerCase()} listed</p>
                )}
              </div>
            ))}
          </section>

          <section className="mt-[6rem] px-4 sm:px-6 lg:px-8">
            <div className="h-px w-100 rounded bg-gradient-to-r from-gray-400 to-gray-800 my-5 md:my-7"></div>
            <p className="text-gray-600 leading-relaxed">{roomDetails.overview}</p>
          </section>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-sm max-md:px-4 py-20 mt-9">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">404 Not Found</h1>
          <div className="h-px w-80 rounded bg-gradient-to-r from-gray-400 to-gray-800 my-5 md:my-7"></div>
          <p className="md:text-xl text-gray-400 max-w-lg text-center">The page you are looking for does not exist or has been moved.</p>
          <a href="#" className="group flex items-center gap-1 bg-white hover:bg-gray-200 px-7 py-2.5 text-gray-800 rounded-full mt-10 font-medium active:scale-95 transition-all">
            Back to Home
            <svg className="group-hover:translate-x-0.5 transition" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.583 11h12.833m0 0L11 4.584M17.416 11 11 17.417" stroke="#1E1E1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default Rooms;
