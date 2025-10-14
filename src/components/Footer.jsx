import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from './components /assets/Logo.png';
// import  insta from 

const Footer = () => {
  const {pathname} = useLocation();
  const hideFooterPaths = ['/login', '/register']; 
  if (hideFooterPaths.includes(pathname.toLowerCase())) return null;

    return (
        <footer>
            <div className="bg-gray-900 text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32">
                <div className="flex flex-wrap justify-between gap-14  md:gap-6 gap-y-16">
                    <div>
                        <p className="font-playfair text-lg text-gray-100">ABOUT</p>
                        <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-500 ">
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">How We Work</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Press Centre</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Corporate Info</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-playfair text-lg text-gray-100">SUPPORT</p>
                        <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">COVID-19 FAQs</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Manage your trips</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Safety resource centre</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Contact Customer Service</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Accessibility</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-playfair text-lg text-gray-100">CUNSUMER POLICY</p>
                        <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Concellation & Returns</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Term of Us</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Security</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">Sitemap</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition-colors">EPR Comllance</a></li>
                        </ul>
                    </div>
                <div className="border-l border-gray-600  max-w-80 pl-6"> <a href='#'>
                        <img alt="logo" className="h-14 opacity-80 filter invert brightness-200 mt-[-1rem]" src={logo}/>
                        </a>
                        <p className="text-sm ml-5 text-gray-500">
                            Experience comfort and elegance at every stay  your perfect getaway awaits at VibeNext Hotels.
                        </p>
                       {/* Mail Us section */}
                    <p className="font-bold  ml-5 text-gray-300 hover:text-gray-200">Mail Us:</p>
                     <div className="text-sm text-gray-500 ml-5">
                        teekamkumarkewat22@gmail.com
                    </div>
                      {/* Social Section */}
                    <div className=" ml-5">
                        <p className="font-bold mb-2 text-gray-300 hover:text-gray-200">Social:</p>
                       <div className="flex gap-3 hover">
                          <a href=" https://www.facebook.com/teekam.22" aria-label="Facebook">
                             <img
                                alt="Facebook"
                                src='https://img.icons8.com/?size=100&id=86289&format=png&color=FFFFFF'
                                width="24"
                                height="24"
                            />
                        </a>
                        <a href="https://x.com/teekam22?t=TXIf6mOteF0mubW1GyzE4Q&s=09" aria-label="Twitter">
                            <img
                                alt="Twitter"
                                src='https://img.icons8.com/?size=100&id=YfCbGWCWcuar&format=png&color=FFFFFF'
                                width="24"
                                height="24"
                            />
                        </a>
                        <a href="https://www.linkedin.com/in/teekam-kumar-15b925337/" aria-label="Linkden">
                            <img
                                src="https://img.icons8.com/?size=100&id=SpWF8oFuEpcU&format=png&color=FFFFFF"
                                alt="Linkden"
                                width="26"
                                height="26"
                            />
                        </a>
                        <a href=" https://www.instagram.com/its_tk_22?igsh=N2dkM2R6NXBuMmZr" aria-label="Instagram">
                            <img
                                alt="Instagram"
                                src='https://img.icons8.com/?size=100&id=32320&format=png&color=FFFFFF'
                                width="25"
                                height="25"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <hr className="border-gray-600 mt-8" />
        <div className="flex flex-col md:flex-row text-gray-400 hover:text-gray-300 items-center justify-center py-5">
            <p>© 2025 VibeNext. All rights reserved.</p>
        </div>
    </div>
</footer>
    );
};

export default Footer;
