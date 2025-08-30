import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { IoFlashOutline } from "react-icons/io5";
import { FaGripLines } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { LuUserPlus } from "react-icons/lu";





export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white/30 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-white">Trello Clone Project</div>


                    {/* <select name="" id="" >

                        <option value=""></option>
                        <option value="todo">Board</option>
                        <option value="inprogress" >Table</option>
                        <option value="done" >Calendar</option>
                    </select> */}

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-6">
                        <a href="#" >
                            <MdOutlineRocketLaunch className="text-gray-400  w-6 h-6 transition-all duration-300 
                   hover:scale-125 hover:shadow-lg hover:font-bold"/>

                        </a>
                        <a href="#" >
                            <IoFlashOutline className=" text-gray-400  w-6 h-6 transition-all duration-300 
                   hover:scale-125 hover:shadow-lg hover:font-bold" />
                        </a>
                        <a href="#">
                            <FaGripLines className="text-gray-400 w-6 h-6 transition-all duration-300 
                   hover:scale-125 hover:shadow-lg hover:font-bold" />
                        </a>
                        <a href="#" >
                            <FaRegStar className="text-gray-400  w-6 h-6 transition-all duration-300 
                   hover:scale-125 hover:shadow-lg hover:font-bold" />
                        </a>
                        <a href="#">
                            <BiWorld className="text-gray-400  w-6 h-6 transition-all duration-300 
                   hover:scale-125 hover:shadow-lg hover:font-bold" />
                        </a>
                        <a href="#">
                            <PiDotsThreeOutlineFill className="text-gray-400  w-6 h-6 transition-all duration-300 
                   hover:scale-125 hover:shadow-lg hover:font-bold" />
                        </a>
                        <a href="#">
                     <LuUserPlus className="text-gray-400  w-6 h-6 transition-all duration-300 
                   hover:scale-125 hover:shadow-lg hover:font-bold" /> 
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg px-4 py-2 space-y-2 w-full">
                    <a href="#" className="block text-gray-700 hover:text-blue-600">
                        Home
                    </a>
                    <a href="#" className="block text-gray-700 hover:text-blue-600">
                        About
                    </a>
                    <a href="#" className="block text-gray-700 hover:text-blue-600">
                        Services
                    </a>
                    <a href="#" className="block text-gray-700 hover:text-blue-600">
                        Contact
                    </a>
                </div>
            )}
        </nav>
    );
}
