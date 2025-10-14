import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const RoomCard = ({ title, hotelLocation, description,rating, price, images, link }) => (
  <Link to={link} className="block">
    <div className="flex flex-col md:flex-row border rounded-lg shadow-sm hover:shadow-gray-600 bg-gray-100 overflow-hidden">
      <img src={images} alt={title} className="m-1 rounded-lg w-full  md:w-64 h-60 md:h-52 object-cover" />
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600">{title}</h2>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            <span>{hotelLocation}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3">{description}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-yellow-500 text-sm">⭐ {rating}</span>
          <div className="text-right">
            <p className="text-sm text-gray-700">Starting from</p>
            <p className="text-lg font-bold text-green-600">${price}</p>
            <p className="text-xs text-gray-500">per night</p>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

 const SelectedCategory = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState({});
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [guests, setGuests] = useState(1);
  const h2Ref = useRef(null);
  const { slug } = useParams();

 useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/category/allpost/${slug}`, {
    headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0' }
}) .then(res => {
        setCategory(res.data.category);
        setPosts(res.data.post);
      })
      .catch(err => toast.error(err.message));
  }, [slug]);

  const filteredPosts = posts.filter(p => p.price <= maxPrice && (!p.guest || p.guest >= guests));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mt-10 text-center mb-7">{category.name}</h1>

      {/* Desktop Filters + Hotels */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <aside className="lg:col-span-1 hidden lg:block bg-gray-100 border rounded-lg p-6 sticky top-24 h-fit shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Filter by</h2>
          💰 Max Price<div className="space-y-6">
            {[10000, 8000, 5000,3000].map(p => (
              <label key={p} className="flex items-center gap-2">
                <input type="checkbox" checked={maxPrice === p} onChange={() =>
                   setMaxPrice(maxPrice === p ? Infinity : p)} className="accent-blue-600" />
                <span>Up to ${p}</span>
              </label>
            ))}
            {[1, 2, 3, 4, 5,6].map(n => (
              <label key={n} className="flex items-center gap-2">
                <input type="checkbox" checked={guests === n} onChange={() => 
                  setGuests(guests === n ? 1 : n)} className="accent-blue-600" />
                <span>{n} Guest{n > 1 ? 's' : ''}</span>
              </label>
            ))}
          </div>
        </aside>

        <main className="lg:col-span-3 flex flex-col gap-3" ref={h2Ref}>
          {filteredPosts.length ? (
            filteredPosts.map(post => (
              <RoomCard key={post._id} {...post} link={`/room/${post.slug}`} />
            ))
          ) : (
            <p className="text-center text-gray-500">No hotels match your filters.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default SelectedCategory;
