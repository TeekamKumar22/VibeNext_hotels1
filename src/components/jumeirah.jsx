import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import  { FaWifi, FaBriefcase, FaSwimmingPool, FaCar, FaStar } from 'react-icons/fa';
import {MdLocationOn} from 'react-icons/md';

const JumeirahDetails = () => {
  const params = useParams( );
  const [room, setRoom] = useState(null);
  // const [mainImage, setMainImage] = useState(null);
console.log("roodetail"+room);

  const handlePostDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/posts/${params.slug}`);
      setRoom(response.data.post);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };
  useEffect(() => {
    handlePostDetails();  
  } , [params.slug]);

  // useEffect(() => {
  //   const room = roomsDummyData.find((room )=> room._id === id);
  //   room && setRoom(room);
  //   room && setMainImage(room.images[0]);
  // }, []);


  return room && (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Room Details */}
      <div className='flex flex-col md:flex-row gap-2 items-start md:items-center'>
        <h1 className='text-3x1 md:text-4xl font-playfair'>{room.hotel.name}<span className='font-inter text-sm'>({room.roomType})</span></h1>
        <p className='text-xs font-inter py1.5 px-2 bg-gray-200 rounded-full'>20% OFF</p>
      </div>
      <div>
        {/* Room Raiting */}
        <div className='flex items-center gap-2 mt-2'>
          <StarRaiting />
          <p className='ml-2'>200+ reviews</p>
      </div>
      {/* Room Adress */}
      <div className="mt-2 flex items-center gap-2 ">
      <img alt="Location icon"
       src={assets.locationIcon}
      />
      <span>Main Road 123 Street, 23 Colony</span>
      </div>
      </div>
      {/* Room Images */}
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-4'>
          <img src={mainImage} alt="Main Room" className='w-full h-64 object-cover rounded-lg shadow-lg' />
          <div className='grid grid-cols-2 gap-2'>
            {room.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Room Image ${index + 1}`}
                className='w-full h-32 object-cover rounded-lg cursor-pointer'
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-semibold'>Room Description</h2>
          <p>{room.description}</p>
          <h3 className='text-lg font-semibold'>Price: ${room.price} per night</h3>
        </div>
  </div>
  </div>
  )
}

 
export default JumeirahDetails;