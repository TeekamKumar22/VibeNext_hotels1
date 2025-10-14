import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const UserProfile = () => {
  return (
    <div className="bg-transparent font-sans min-h-screen p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row mt-[6rem] gap-6">
        
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 bg-white shadow-lg p-6 flex flex-col items-center  justify-center space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700">Welcome, to VibeNext</h2>
                 <p className="text-sm text-gray-500"> {new Date().toLocaleDateString('en-GB', {
                  weekday: 'short',day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
          </div>
          <FaUserCircle className="text-5xl text-gray-600" />
           <a href='login'>Login</a>
        </aside>

        {/* Main Content */}
        <main className="w-full md:flex-1 bg-white shadow p-6 rounded-md">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/550/731/original/user-icon-vector.jpg"
                alt="User"
                className="rounded-full w-16 h-16"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-800">Alexa Rawles</h3>
                <p className="text-sm text-gray-500">alexrawles@gmail.com</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
              Edit
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="border p-2 rounded-md text-sm" />
            <input type="text" placeholder="Last Name" className="border p-2 rounded-md text-sm" />
            <select className="border p-2 rounded-md text-sm">
              <option>Select Gender</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
            <input type="text" placeholder="Phone Number" className="border p-2 rounded-md text-sm" />
            <select className="border p-2 rounded-md text-sm">
              <option>Select Language</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>
            <input type="text" placeholder="City" className="border p-2 rounded-md text-sm" />
          </div>

          {/* Email Section */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 mb-2">My email address</h4>
            <div className="flex justify-between items-center border p-2 rounded-md text-sm">
              <span>alexrawles@gmail.com</span>
              <span className="text-blue-600">✔ Added 1 month ago</span>
            </div>
            <button className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">
              + Add Email Address
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
