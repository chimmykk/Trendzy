"use client"

import { useState } from "react";
import Image from "next/image";
import {  FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { signIn, useSession, getSession } from "next-auth/react"
import ResetPw from "./resetPassword";
import SignUp from "../register/signUpModal";
import { usePathname } from "next/navigation";

interface props {
    setIsModalOpenLogin: (isOpen: boolean) => void;
    // setResetPassword: (isOpen: boolean) => void;
  }

  interface props2 {
    setIsModalOpenLogin: (isOpen: boolean) => void;
    setResetPassword: (isOpen: boolean) => void;
    openSignUp : boolean;
    handleSignUpClick: () => void;
  }

  export default function Login({setIsModalOpenLogin} : props){
  
  const [resetPassword, setResetPassword] = useState(false); // State for resetPassword

  const pathname = usePathname();

      const { data: session } = useSession();

    const toggleModal = () => {
        setIsModalOpenLogin(false);
      };

    const toggleResetPw = () => {
      setResetPassword(!resetPassword)
    }

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal only if the click event occurred on the overlay itself (outside the modal content)
    if ((e.target as HTMLDivElement).classList.contains('modal-overlay')) {
      toggleModal();
    }
  };
  const [openSignUp, setOpenSignUp] = useState(false)

   const handleSignUpClick = () => {
    setOpenSignUp(true); // Open the Login component
  };

  

    return(
                  <div className={`fixed inset-0 flex items-center top-0 w-full min-h-screen left-0 justify-center z-50 ${openSignUp === true ? " bg-transparent" : "bg-[#000000]"}  bg-opacity-80 modal-overlay`}
                    onClick={pathname === '/register' ? undefined : closeModal}
            >
              <div className=" rounded-md  w-full max-w-md px-6 py-8 bg-white ">
                {resetPassword ? 
                 /* Render the password reset input field here */
                 <ResetPw backToLogin ={toggleResetPw}/>
               : 
              <LoginForm openSignUp={openSignUp} handleSignUpClick={handleSignUpClick} setIsModalOpenLogin={toggleModal} setResetPassword={setResetPassword}/>
              }
              </div>
            </div>
    )
}

function LoginForm({setIsModalOpenLogin, setResetPassword, openSignUp, handleSignUpClick}: props2){

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const router = useRouter();


  const { data: session } = useSession();
  
  const handleLogin = async () => {
    setLoggingIn(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false, 
      });

      if (result?.error) {
        // Handle login error, e.g., show an error message
        console.error('Login failed:', result.error);
        alert('invalid credential or wrong password')
        setLoggingIn(false)
      } else {
        // Redirect to a different page after successful login
        // alert("login succesful kekeke")
        setIsModalOpenLogin(false)       
        router.push('/'); // Change this to your desired redirect path
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

  return(
               <>
                <h2 className="text-2xl font-semibold text-black text-center">Log In</h2>
                <div className="text-center flex flex-col gap-6 mt-8 relative">
                  {/* continue with google btn */}
                    <div
                      className="w-full button text-center py-4 flex items-center justify-center gap-2 border border-bgDark rounded-lg text-slate-700 hover:border-black transition duration-150"
                    >
                    <Image
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      width={1000}
                      height={1000}
                      alt="google-logo"
                      className="w-6 h-6"
                      loading="lazy"
                    />
                      <button onClick={() => signIn('google')}>Sign in with Google</button>
                  </div>
                  <div className="flex items-center justify-center mb-6">
                    <div className="border-t border-slate-300 w-full mx-2"></div>
                    <span className="bg-white px-2 text-gray-500 relative text-sm">OR</span>
                    <div className="border-t border-slate-300 w-full mx-2"></div>
                  </div>
                </div>
                {/* Login Form */}
                <form className="flex flex-col gap-4">
                  <div className="relative">
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input rounded-md border border-slate-400 p-4 text-base w-full text-black focus:border-borderC"
                    />
                    <label
                      htmlFor="login-email"
                      className="user-label absolute left-4 text-gray-500 pointer-events-none transform translate-y-4 transition-transform focus:text-[#25FF79]"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative flex flex-col gap-4">
                    <input
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      className="input rounded-md border border-slate-400 p-4 text-base w-full text-black focus:border-borderC"
                    />
                    <label
                      htmlFor="login-password"
                      className="user-label absolute left-4 text-gray-500 pointer-events-none transform translate-y-4 transition-transform focus:text-[#25FF79]"
                      >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute top-5 right-2"
                    >
                      {showPassword ? <FaEyeSlash className=" text-[#5a5858]" /> : <FaEye className="text-[#5a5858]"/>}
                    </button>
                    <p onClick={() => setResetPassword(true)} className=" text-sm w-fit cursor-pointer hover:text-hoverGreen text-gray-500">
                      Forgot Password?
                    </p>       
                  </div>
                      <button  
                          type="button" 
                          className=" loadingbtn  button w-full bg-bgGreen border border-bgDark transition-all duration-300 text-white text-lg font-semibold rounded-md  text-center mr-2  items-center"
                          onClick={handleLogin}
                      >

                          {loggingIn ? (
                          <>
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                            </svg>
                            Loggin in...
                          </>
                        ) : (
                          'Login'
                        )}
                      </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>
                    Don&apos;t have an account?  
                  </p>
                  <h1 
                  onClick={handleSignUpClick} 
                  className=' text-bgGreen font-semibold cursor-pointer'>
                    Sign up
                    </h1>
                </div>


                        {openSignUp && <SignUp setIsModalOpen={setIsModalOpenLogin} />}
               </>   
  )
}