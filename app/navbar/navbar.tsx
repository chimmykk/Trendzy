"use client"

import Link from "next/link"
import { useEffect, useState } from "react" 
import { usePathname } from "next/navigation"
import Image from "next/image"
import SignUp from "../register/signUpModal"
import Login from "../login/Login"
import { RiUser3Line } from "react-icons/ri"
import{ FiUser,
FiShoppingCart,
FiHelpCircle,
FiDownload,
FiLogOut,
FiDollarSign } from "react-icons/fi"

//next-auth sessions
import { useSession, signOut } from "next-auth/react"

export default  function Navbar() {
    const [showMenu, setShowMenu] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage the dropdown

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const { data: session, status } = useSession();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        console.log(session)
    })


    const toggleModalLogin = () => {
        setIsModalOpenLogin(!isModalOpenLogin);
    };
    const pathname = usePathname();

    if (status === "loading" ) {
        return(
        <div className={`h-screen fixed z-50 w-full bg-white flex items-center justify-center`}>
            <div className="container ">
                <h1 className="fixed top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bgGreen text-white rounded-full px-3 py-1 text-7xl">tr</h1>
                <div className="loader"></div>
            </div>
        </div>
        ) 
      }

  const userMenuItems = [
    { text: 'Profile', icon: <FiUser /> },
    { text: 'My Orders', icon: <FiShoppingCart /> },
    { text: 'Start Selling', icon: <FiDollarSign /> }, // New menu item
    { text: 'Help Center', icon: <FiHelpCircle /> },
    { text: 'Get the App', icon: <FiDownload /> },
    { text: 'Logout', icon: <FiLogOut />, onClick: signOut }, // Include onClick to trigger sign-out
  ];
    return (
        <nav className={` ${pathname === '/register' || pathname === '/login' ? 'hidden' : 'block'} z-40 px-5 sm:px-6 lg:px-4 sticky shadow backdrop-blur-lg top-0 bg-white`}>
            {/* for screen larger than md */}
            <div className="py-3 hidden lg:grid grid-cols-3 text-base  font-medium text-grayText">
                    <Link href={'/'} className=" col-span-1 text-black font-bold">
                        <h1 className=" text-5xl">trendzy</h1>
                    </Link>     
                    <div className=" overflow-hidden rounded-lg flex">
                        <input 
                            placeholder="Search . . ." 
                            className=" font-medium border  hover:border-2 rounded-s-lg py-2 px-4 outline-none w-full text-black placeholder-opacity-26 focus:border-2 focus:border-borderC input-with-shadow " 
                            name="text" 
                            type="text" 
                        />
                        <button className=" bg-bgGreen hover:bg-hoverGreen h-full px-4">
                            <Image src={'./search.svg'} width={25} height={25} alt="search" className=""/>
                        </button>
                    </div>
                <div className="flex lg:gap-20 xl:gap-25 justify-end col-span-1">
                    <div className="flex items-center text-black gap-3 font-bold">
                     {/* Conditionally render the buttons based on session status */}
                {session ? 
                (
                <div className="flex gap-1">
                    <div onClick={toggleDropdown}> 
                        <RiUser3Line className="text-3xl w-10 cursor-pointer h-12" />
                    </div>
                </div>
                ) : (
                <div className="flex items-center text-black gap-3 text-lg font-medium ">
                    <div 
                        onClick={toggleModalLogin} 
                        className=" cursor-pointer bg-bgGray hover:bg-[#e4dfdf] transition-hover duration-300 rounded-lg py-2 px-4">
                        Log In
                    </div>
                    <div 
                        onClick={toggleModal} 
                        className=" cursor-pointer rounded-lg bg-bgGreen hover:bg-hoverGreen text-white transition-hover duration-300  py-2 px-4">
                        Sell Live
                    </div>
                </div>
                )}
                    </div>
                </div>
                {isModalOpen && <SignUp setIsModalOpen={setIsModalOpen} />}
                {isModalOpenLogin && <Login setIsModalOpenLogin={setIsModalOpenLogin} />}
                {isDropdownOpen && (
                    <div className="absolute right-0 top-16 text-bgDark bg-white border rounded-lg shadow-lg p-4">
                        <div className="text-lg mb-4">Hi, {session?.user?.name}</div> {/* Increase font size */}
                        <ul>
                        {userMenuItems.map((item, index) => (
                            <li
                            key={index}
                            className="cursor-pointer py-3 px-4 hover:bg-gray-100 flex items-center"
                            onClick={() => {
                                if (item.onClick) {
                                item.onClick();
                                }
                                toggleDropdown();
                            }}
                            >
                            {item.icon && (
                                <div className="mr-4 text-xl"> {/* Increase icon size */}
                                {item.icon}
                                </div>
                            )}
                            {item.text}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}

            </div>

         {/* for screen lower than md */}
            <div className="lg:hidden w-full py-5 flex justify-between items-center">
                <div>
                    <Link href={'/'} className=" text-2xl font-bold">trendzy</Link>
                </div>
                {
                    !session ?
                    (
                     <div
          onClick={toggleModalLogin}
          className="cursor-pointer bg-bgGray hover:bg-[#e4dfdf] transition-hover duration-300 rounded-lg py-2 px-4 flex items-center"
        >
          <RiUser3Line className="text-xl mr-2" /> {/* Add the login icon */}
          Log In
        </div>
                    ) 
                    :
                    (
                        <button onClick={() =>  setShowMenu(true)} className="  flex flex-col gap-1.5">
                    <div className="w-[20px]  border border-black"></div>
                    <div className="w-[15px]  border border-black"></div>
                    <div className="w-[20px]  border border-black"></div>
                </button>
                    )

                }
                <div className={`${showMenu ? "  left-0" : " -left-[100%]"} fixed top-0 min-h-screen w-full`}>
                    <div onClick={() => setShowMenu(false)} className="absolute  overflow-y-hidden z-50 w-full min-h-screen bg-black opacity-50">
                    </div>
                    <div  className={`${showMenu ? "left-0 " : "-left-[100%]"} flex flex-col py-20 transition-all duration-500 min-h-screen max-h-screen ease-in-out px-5 w-3/4 gap-8 fixed top-0 z-50 bg-white  overflow-y-auto overflow-x-hidden `}>
                        <button onClick={() => setShowMenu(false)}  className="absolute top-5 right-5">X</button>
                        {/* List of user menu items */}
                        <ul>
                        {userMenuItems.map((item, index) => (
                            <li
                            key={index}
                            className="cursor-pointer py-3 px-4 hover:bg-gray-100 flex items-center"
                            onClick={() => {
                                if (item.onClick) {
                                item.onClick();
                                }
                                setShowMenu(false); // Close the mobile menu after clicking a menu item
                            }}
                            >
                            {item.icon && (
                                <div className="mr-4 text-xl">
                                {item.icon}
                                </div>
                            )}
                            {item.text}
                            </li>
                        ))}
                        </ul> 
                    </div>
                </div>
                                {isModalOpen && <SignUp setIsModalOpen={setIsModalOpen} />}
                {isModalOpenLogin && <Login setIsModalOpenLogin={setIsModalOpenLogin} />}
            </div>
        </nav>
    )
  }



  