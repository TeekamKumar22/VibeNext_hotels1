import { FaUser } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // For detecting current route
import logo from "./components/assets/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const isSignIn = false; // Replace with actual auth state

  const isHomePage = location.pathname === '/';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDropdownToggle = () => setIsDropdownOpen(prev => !prev);
  const DropdownClose = () => setIsDropdownOpen(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true); // Always white for non-home pages
      return;
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <nav
      className={`fixed top-0 left-0 h-[70px] w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-20 z-50 transition-all duration-500 py-3 md:py-4 ${
        isScrolled ? 'bg-gray-50/80 shadow-md backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="logo"
          className={`h-[63px] w-[230px] transition-all duration-500 ${
            isScrolled ? 'filter convert' : 'filter brightness-0 invert'
          }`}
        />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center mr-[14rem] gap-4 lg:gap-8">
        {['Home', 'Hotels', 'About', 'Contact'].map((label, i) => {
          const href = label === 'Hotels' ? '/dubai' : '/';
          return (
            <a
              key={i}
              href={href}
              data-discover="true"
              aria-current={label === 'Home' ? 'page' : undefined}
              className={`group flex flex-col gap-0.5  ${isScrolled ? 'text-black' : 'text-white'} ${
                label === 'Home' ? 'active' : ''
              }`}
            >
              {label}
              <div
                className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                  isScrolled ? 'bg-black' : 'bg-white'
                }`}
              ></div>
            </a>
          );
        })}
      </div>

      {/* Profile + Dropdown */}
      <div className="flex items-center space-x-4 mr-[1rem] relative cursor-pointer">
        <FaUser
          size={20}
          className={`${isScrolled ? 'text-black' : 'text-white'}`}
          onClick={handleDropdownToggle}
        />
        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-36 w-48 text-white bg-transparent border border-gray-300 rounded shadow-lg z-50"
            onMouseLeave={DropdownClose}
          >
            <ul>
              <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                <a href="/profile" data-discover="true" aria-current="page">
                  Profile
                </a>
              </li>
              {isSignIn ? (
                <li className="px-4 py-2 hover:bg-gray-500 cursor-pointer">
                  <a href="/">Sign Up</a>
                </li>
              ) : (
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                  <a href="/login">Login</a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
    
  );
};

export default Navbar;
