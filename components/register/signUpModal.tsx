"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SignUpWithEmailForm from "./form_verify";
import Login from "../login/LoginModal";
import { usePathname } from "next/navigation";
import { signIn } from "next-auth/react";

const SignUp = ({setIsModalOpen} : {setIsModalOpen:(isOpen: boolean) => void}) => {

   const [showSignUpWithEmailForm, setShowSignUpWithEmailForm] = useState(false);
   const [openLogin, setOpenLogin] = useState(false)

   const pathname = usePathname();

  const toggleSignUpWithEmailForm = () => {
    setShowSignUpWithEmailForm(!showSignUpWithEmailForm);
  };

    const toggleModal = () => {
        setIsModalOpen(false);
      };

         const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal only if the click event occurred on the overlay itself (outside the modal content)
    if ((e.target as HTMLDivElement).classList.contains('modal-overlay')) {
      toggleModal();
    }
  };

   const handleLoginClick = () => {
    setOpenLogin(true); // Open the Login component
  };


    return(
      <div className={`fixed inset-0 flex items-center top-0 w-full min-h-screen left-0 justify-center z-50 ${openLogin === true ? " bg-transparent" : "bg-[#000000]"}  bg-opacity-80 modal-overlay`}
                onClick={pathname === '/register' ? undefined : closeModal}

            >
        <div className="  w-full max-w-md px-6 py-8 bg-white rounded-md " 
        >
           {showSignUpWithEmailForm ? (
          <SignUpWithEmailForm onClose={toggleSignUpWithEmailForm} setIsModalOpen={setIsModalOpen}/>
        ) : (
          <>
            
        <h2 className="text-xl text-black font-normal text-center mb-6">Sign up and explore!</h2>
        <div className="text-center flex flex-col gap-4  items-center">
          {/* continue with google btn */}
            <button
                className=" button w-full text-center py-4 flex items-center justify-center gap-2 border border-bgDark rounded-lg text-slate-700 transition duration-150"
            >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              width={1000}
              height={1000}
              alt="google-logo"
              className="w-6 h-6"
              loading="lazy"
            />
            <button onClick={() => signIn('google')}> Continue with Google</button>
          </button>
          <div className="flex items-center justify-center ">
            <div className="border-t border-slate-300 w-full mx-2"></div>
            <span className=" px-2 text-gray-500 relative text-sm">OR</span>
            <div className="border-t border-slate-300 w-full mx-2"></div>
          </div>
            
          <button
                className=" button w-full text-center py-4 flex items-center justify-center bg-bgDark text-white gap-2 border hover:border-bgDark rounded-lg   hover:bg-darkLint transition duration-150"
              onClick={toggleSignUpWithEmailForm}
            >
            <Image
              src="./email.svg"
              width={1000}
              height={1000}
              alt="google-logo"
              className="w-6 h-6"
              loading="lazy"
            />
            <span >Continue with email</span>
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? 
          <p 
            className=' text-bgGreen cursor-pointer font-semibold' 
            onClick={handleLoginClick}
            >
            Log in
          </p>
        </p>
        {openLogin && <Login setIsModalOpenLogin={toggleModal} />}
          </>
        )}
      </div>
        </div>
    )
}

export default SignUp
