import React from "react";
import {IoNotifications} from "react-icons/io5";
import {FaUser} from "react-icons/fa";
import { Link } from "react-router-dom";
import {BiLogOut} from "react-icons/bi";
import XSvg from "../svgs/X";
import { MdHomeFilled } from "react-icons/md";

const sideBar = () => {
    const data = {
        fullName: "John Doe",  
        username: "johndoe",
        profileImg: "/avatars/boy1.png",
    };

    return (
        <div className="md:flex-[2_2_0] w-18 max-w-52">
            <div className="sticky top-0 left-0 flex flex-col w-20 h-screen border-r border-gray-700 md:lg">
                <Link to="/" className="flex justify-center md:justify-start">
                    <XSvg className="w-12 h-12 px-2 rounded-full fill-white hover:bg-stone-900"/>
                </Link>
                <ul className="flex flex-col gap-3 mt-4">
                    <li className="flex justify-center md:justify-start">
                        <Link to="/"
                        className="flex items-center gap-3 py-2 rounded trransition-all max-w-fit hover:bg-stone-900">
                            <MdHomeFilled className="w-8 h-8" />
                            <span className="hidden text-lg md:block">Home</span>
                        </Link>
                    </li>
                    
                    <li className="flex justify-center md:justify-start">
                        <Link to="/notifications"
                        className="flex items-center gap-3 py-2 transition-all duration-300 rounded-full cursor-pointer hover:bg-stone-900 max-w-fit"
                        >
                            <IoNotifications className="w-6 h-6" />
                            <span className="hidden text-lg md:block">Notifications</span> 
                        </Link>
                    </li> 

                    <li className="flex justify-center md:justify-start">
                        <Link
                            to={`/profile/${data?.username}`}
                            className="flex items-center gap-3 py-2 duration-300 rounded-full cursor-pointer ptransition-all hover:bg-stone-900 max-w-fit" >
                                <FaUser className="w-6 h-6" />
                                <span className="hidden text-lg md:block">Profile</span>
                            </Link>  
                    </li>
                </ul> 
                {
                    data && (
                        <Link 
                            to={`/profile/${data?.username }`}
                            className="flex items-start gap-2 px-4 py-2 mt-auto mb-10 transition-all duration-300 rounded-full hover:bg-[#181818]"
                            >
                                <div className="avatar hiddedn md:inline-flex">
                                    <div className="w-8 rounded-full">
                                        <img src={data?.profileImg} alt="" />
                                    </div>
                                </div>
                                <div className="flex justify-between flex-1">
                                    <div className="hidden md:block">
                                        <p className="w-20 text-sm font-bold text-white">{data?.username}</p>
                                    </div>
                                    <BiLogOut className="w-6 h-6"/> 
                                </div>
                            </Link>
                    )
                }
            </div>
        </div>
    );
}

export default sideBar;