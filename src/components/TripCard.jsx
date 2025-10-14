import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TripCard = () => {
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState([]);
  const [visible, setVisible] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}/api/post/allpost`, {
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0' }
    })
    .then(res => {
      const data = res.data.post || res.data.posts || [];
      const sliced = data.slice(13, 16); // Only take first 3 hotels
      setRoomDetails(sliced);
      setVisible(Array(sliced.length).fill(false));
    })
    .catch(err => console.error("Error:", err.message));
  }, []);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, idx) => {
      if (!ref) return null;
      return new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
            observers[idx]?.disconnect();
          }
        },
        { threshold: 0.2 }
      );
    });

    cardRefs.current.forEach((ref, idx) => {
      if (ref && observers[idx]) observers[idx].observe(ref);
    });

    return () => {
      observers.forEach((observer) => observer && observer.disconnect());
    };
  }, [roomDetails]);

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-9 text-center">Explore Exclusive Hotels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {roomDetails.map((post, index) => (
          <article
            key={post._id}
            ref={el => cardRefs.current[index] = el}
            className={`relative isolate flex flex-col justify-end overflow-hidden rounded-lg aspect-[3/2] shadow-lg w-full max-w-[23.5rem] mx-auto transform transition-all duration-700
              ${visible[index] ? 'opacity-100 translate-y-0 scale-105' : 'opacity-0 translate-y-8 scale-95'}`}
            style={{ willChange: 'transform, opacity' }}
          >
            <img
              src={post.images}
              alt="Post Thumbnail"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
            <div className="relative z-10 px-6 pb-6 pt-32">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {post.title}
              </h3>
              <div
                className="text-sm sm:text-base leading-6 text-gray-300 cursor-pointer"
                onClick={() => navigate(`/room/${post.slug}`)}
              >
                {post.hotelLocation}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default TripCard;
