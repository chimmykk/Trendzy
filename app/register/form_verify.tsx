

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
  
  const router = useRouter()

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are necessary.');
      return;
    }

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
            Create Account
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