"use client"

import Link from "next/link"
import { useEffect, useState } from "react" 
import { usePathname } from "next/navigation"
import Image from "next/image"
import SignUp from "../register/signUpModal"
import Login from "../login/Login"

//next-auth sessions
import { useSession, signOut } from "next-auth/react"


export default  function Navbar() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);

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



    return (
        <nav className={` ${pathname === '/register' || pathname === '/login' ? 'hidden' : 'block'} z-40 px-5 sm:px-6 lg:px-4 sticky shadow backdrop-blur-lg top-0 bg-white`}>
            {/* for screen larger than md */}
            <div className="py-3 hidden md:grid grid-cols-3 text-base  font-medium text-grayText">
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
                    <div className="text-xs">hi, <br /> {session.user?.name}</div>  
                    <div onClick={() => signOut()} className="cursor-pointer rounded-lg bg-bgGreen hover:bg-hoverGreen text-white transition-hover duration-300 py-2 px-4">
                        Sign Out
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
            </div>

            {/* for screen lower than md
            <div className="lg:hidden py-5 flex justify-between items-center">
                    <Link href={'/'} className="flex items-center gap-2 text-3xl font-extrabold">
                        <Image src={'/LOGO4.jpg'} width={30} height={30} alt="pic" />
                        <h1>Livetrendx</h1>
                    </Link>
                <div>
                    <Link href={'/'}><button className=" bg-black hover:bg-[#fff] hover:text-black border border-black transition-all duration-500 text-white py-3 px-7 rounded-full">Get Started</button></Link>
                </div>
               
                <div className={`${showMenu ? "  left-0" : " -left-[100%]"} text-lg fixed top-0 min-h-screen w-full`}>
                    <div onClick={() => setShowMenu(false)} className="absolute  overflow-y-hidden z-50 w-full min-h-screen bg-black opacity-50">
                    </div>
                    <div  className={`${showMenu ? "left-0 " : "-left-[100%]"} flex flex-col py-20 transition-all duration-500 min-h-screen max-h-screen ease-in-out px-10 w-1/2 gap-8 fixed top-0 z-50 bg-white  overflow-y-auto overflow-x-hidden `}>
                        <button onClick={() => setShowMenu(false)}  className="absolute top-5 right-5">X</button>
                        <Link className="border-b" onClick={() => setShowMenu(false)} href={'/'}>Home</Link>
                        <Link className="border-b" onClick={() => setShowMenu(false)} href={'/'}>Features</Link>
                        <Link className="border-b" onClick={() => setShowMenu(false)} href={'/pricing'}>Pricing</Link>
                    </div>
                </div>
            </div> */}
        </nav>
    )
  }



  