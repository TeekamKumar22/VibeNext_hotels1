import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Destination = () => {
  const [destinations, setDestinations] = useState([]);
  const [visible, setVisible] = useState([]);
  const itemRefs = useRef([]);
  const h2Ref = useRef(null);
  const pRef = useRef(null);
  const [h2Visible, setH2Visible] = useState(false);
  const [pVisible, setPVisible] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/category/get-all-category`, {
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0' },
    })
      .then(res => {
        const data = res.data.category;
        setDestinations(data);
        setVisible(Array(data.length).fill(false));
      })
      .catch(err => toast.error(err.message));
  }, []);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, destinations.length);
    const observers = itemRefs.current.map((ref, i) => ref && new IntersectionObserver(([e], o) => {
      if (e.isIntersecting) {
        setTimeout(() => setVisible(v => (v[i] = true, [...v])), i * 140);
        o.disconnect();
      }
    }).observe(ref));

    const h2Obs = h2Ref.current && new IntersectionObserver(([e], o) => {
      if (e.isIntersecting) setH2Visible(true), o.disconnect();
    }, { threshold: 0.2 }).observe(h2Ref.current);

    const pObs = pRef.current && new IntersectionObserver(([e], o) => {
      if (e.isIntersecting) setTimeout(() => setPVisible(true), 200), o.disconnect();
    }, { threshold: 0.2 }).observe(pRef.current);

    return () => observers.forEach(o => o && o.disconnect());
  }, [destinations]);

  return (
    <div className="flex flex-col justify-center items-center mt-9 text-center px-2">
      <h2 ref={h2Ref} className={`text-2xl font-bold mt-6 transition-all duration-700 ${h2Visible ? 'opacity-100 translate-x-0 scale-105' : 'opacity-0 -translate-x-8 scale-95'}`}>
        Explore Our Destinations
      </h2>
      <p ref={pRef} className={`text-gray-600 mt-3 transition-all duration-700 ${pVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
        Discover the best places to stay and explore around the world
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-9 w-full max-w-6xl">
        {destinations.length ? destinations.map((dest, i) => (
          <a key={i} href={`/rooms/${dest.slug}`} ref={el => itemRefs.current[i] = el}
            className={`border rounded-lg bg-gray-100 shadow-lg hover:shadow-gray-500 overflow-hidden cursor-pointer 
              w-full h-[16rem] flex flex-col transition-all duration-500 ease-out ${visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${i * 90}ms` }}>
            <img src={dest.image || '/default.jpg'} alt={dest.name}
              className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105" />
            <div className="p-4 flex-1 flex items-center justify-center">
              <h3 className="text-lg font-semibold">{dest.name}</h3>
            </div>
          </a>
        )) : (
          <p className="text-center text-gray-500 col-span-full">
            🔍 Searching for hotels... Hang tight, we're fetching the best stays for you!
          </p>
        )}
      </div>
    </div>
  );
};

export default Destination;
