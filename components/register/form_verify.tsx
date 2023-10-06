

import { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { AiOutlineLeft } from "react-icons/ai"
import { signIn } from 'next-auth/react';



  interface SignUpWithEmailFormProps {
  onClose: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
}


const SignUpWithEmailForm = ({ onClose, setIsModalOpen }: SignUpWithEmailFormProps) => {
  // Add your signup form JSX and logic here

  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null); // Initialize status as null
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false); // State to track verification process
  const [showPassword, setShowPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false)
  
  const router = useRouter()

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are necessary.');
      alert("all fields are neccessary")
      return;
    }
        setIsCreating(true)

    try {
      const response = await fetch('/api/register/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'User registered successfully.') {
          const verificationEmailResponse = await fetch('/api/send/route', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, verification_token: data.verification_token, verification_code: data.verification_code }),
          });

          if (verificationEmailResponse.ok) {
            setRegistrationSuccess(true);
          } else {
            alert('User registered successfully, but failed to send verification email.');
          }
        } else {
          alert('Registration failed: ' + data.message);
        }
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('An error occurred while registering the user:', error);
      alert('An error occurred while registering the user.');
    }
  };


  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleConfirmCodeClick = () => {
                setIsVerifying(true); // Set the verifying state to true 
    const code = parseInt(verificationCode, 10);
    if (!isNaN(code)) {
      const requestBody = {
        email: email,
        verification_code: verificationCode,
      };

      fetch('/api/verifyemail/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (response.ok) {
            setVerificationStatus('Email verified successfully'); 
              // Create a session for the user
          signIn('credentials', {
            email: email,
            password: password, // Provide the user's password here
            callbackUrl: '/', // Redirect to the dashboard after login
          });
            return response.json();
          } else {
            setVerificationStatus('Failed to verify email');
            setIsVerifying(false); // Set the verifying state to false on failure
            throw new Error('Failed to verify email');
          }
        })
        .catch((error) => {
          console.error('Email verification error:', error);
          setIsVerifying(false); // Set the verifying state to false on error
        });
    } else {
      setVerificationStatus('Invalid verification code. Please enter a valid integer'); 
      setIsVerifying(false); // Set the verifying state to false on validation error
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

   const RenderSignUpForm = () => (
        <form className='flex flex-col gap-4 pt-8'>
          <div className="relative ">
            <input
              required
                      type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="input rounded-md border border-slate-400  p-4 text-base w-full text-black focus:border-borderC"
            />
                <label className="user-label absolute left-4 text-gray-500 pointer-events-none transform translate-y-4 transition-transform focus:text-blue-500">
              Name
            </label>
          </div>


          <div className="relative ">
            <input
              required
                      type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input rounded-md border border-slate-400 p-4 text-base w-full text-black focus:border-borderC"
            />
                <label htmlFor='email' className="user-label absolute left-4 text-gray-500 pointer-events-none transform translate-y-4 transition-transform focus:text-blue-500">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              required
              type={showPassword ? 'text' : 'password'}
                      value={password}
            onChange={(e) => setPassword(e.target.value)}
              id='password'
              className="input rounded-md border border-slate-400 p-4 text-base w-full text-black focus:border-borderC"
            />
            <label htmlFor='password' className="user-label absolute left-4 text-gray-500 pointer-events-none transform translate-y-4 transition-transform focus:text-blue-500">
              Password
            </label>
            
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute h-full  right-2 "
            >
              {showPassword ? <FaEyeSlash className=" text-[#5a5858]" /> : <FaEye className="text-[#5a5858]"/>}
            </button>
          </div>
            <div className="checkbox-wrapper-12 flex gap-2 items-end">
              <div className="cbx flex">
                <input id="cbx-12" type="checkbox"/>
                <label htmlFor="cbx-12"></label>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></feColorMatrix>
                    <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                  </filter>
                </defs>
              </svg>
                <div className='text-black '>
                  I agree with Trendzy&apos;s <Link href="#" className=' text-bgGreen font-medium'>Terms of service</Link> and <Link href="#" className='text-bgGreen font-medium'>Privacy policy</Link>
                </div>
            </div>
          <button
            type="submit"
            className=" button w-full bg-bgGreen transition-all duration-300 text-white text-lg font-semibold rounded-md border border-bgDark"
            onClick={handleSignup}
          >
                                    {isCreating ? (
                          <>
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                            </svg>
                            Creating your account...
                          </>
                        ) : (
                          'Create account'
                        )}
          </button>
        </form>
  );

const renderVerificationCodeInput = () => (
  <form className="flex flex-col gap-4 pt-8">
    <h2 className="text-2xl font-semibold text-black">Verify your email address</h2>
    <p className="text-base text-gray-600">Enter verification code</p>
    <p className="text-sm text-gray-600">We sent a 6-digit code to {email}</p>

    {/* Verification code input field */}
    <input
      required
        type="text"
        value={verificationCode}
        onChange={handleVerificationCodeChange}
      className="input rounded-md border border-slate-400 p-4 text-base w-full text-black focus:border-borderC"
    />

    {/* Small field to resend code */}
    <p className="text-sm text-gray-600">
      <button
        type="button"
        
        className="text-bgGreen hover:text-hoverGreen focus:text-blue-500 font-medium"
      >
        Resend code
      </button>
    </p>

    {/* Submit button */}
    <button
        type="button"
        onClick={handleConfirmCodeClick}
        className={`w-full bg-bgGreen hover:bg-hoverGreen transition-all duration-300 text-white text-lg font-semibold py-2 px-4 rounded-md ${
          isVerifying ? 'opacity-50 cursor-wait' : ''
        }`}
        disabled={isVerifying}
      >
        {isVerifying ? 'Verifying...' : 'Verify'}
    </button>
  </form>
);


  return (
    <div  >
      {/* Your signup form content goes here */}
        <AiOutlineLeft className='text-black w-[45px] h-[45px] px-3 border hover:border-borderC transition-all ease-in-out duration-300 font-bold text-xl cursor-pointer rounded-full'  onClick={onClose} />
         {registrationSuccess ? renderVerificationCodeInput() : RenderSignUpForm()}
               {/* Render the verification status */}
            {/* Render the verification status */}
      {verificationStatus && 
        <div className="fixed inset-0 top-10 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-4 transform scale-100 opacity-100 transition-transform duration-300">
            <p>
            {verificationStatus}
            </p>
          </div>
        </div>
      }
    </div>
  );
};


export default SignUpWithEmailForm