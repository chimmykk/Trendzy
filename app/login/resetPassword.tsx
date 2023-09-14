import { useState } from "react";
import Login from "./Login";

export default function ResetPw({ backToLogin }: { backToLogin: () => void }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false); // State for loading state


  const handleNextStep = () => {
    setStep(step + 1);
  };

   const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required.');
      return;
    }

    try {
      setLoading(true); // Set loading state to true
      const response = await fetch('/api/resetpassword/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setError('');
        // Move to the next step
        setStep(2);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('An error occurred while resetting the password:', error);
      setError('An error occurred while resetting the password.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationCode) {
      setError('Verification code is required.');
      return;
    }

    try {
      const response = await fetch('/api/resetpassword/verifycode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode, email }),
      });

      if (response.ok) {
        setError('');
        // Move to the next step
        handleNextStep()
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('An error occurred while verifying the code:', error);
      setError('An error occurred while verifying the code.');
      setSuccess(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await fetch('/api/resetpassword/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode, newPassword, email }),
      });

      if (response.ok) {
        setSuccess(true);
        // setOpenLogin(true)
        setError('');
        // Password changed successfully, you can redirect the user or perform any other action here.
         // Display success message for a few seconds before redirecting
      setTimeout(() => {
        backToLogin();
      }, 3000); // Change 3000 to the desired number of milliseconds (3 seconds in this example)
      } else {
        const data = await response.json();
        setError(data.message);
        setSuccess(false);
      }
    } catch (error) {
      console.error('An error occurred while changing the password:', error);
      setError('An error occurred while changing the password.');
      setSuccess(false);
    }
  };

  const isStep1Valid = /^\S+@\S+\.\S+$/.test(email);
  const isStep2Valid = /^\d{6}$/.test(verificationCode);
  const isStep3Valid = newPassword.length >= 6;

  const isNextButtonDisabled =
    (step === 1 && !isStep1Valid) ||
    (step === 2 && !isStep2Valid) ||
    (step === 3 && !isStep3Valid);

  return (
    <div className="flex flex-col gap-4">
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-black text-center">Reset Password</h2>
          <p className="text-lg font-semibold text-black text-center mb-2">Enter your email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input rounded-md border border-slate-400 p-4 text-base w-full text-black focus:border-borderC"
          />
          <button
            onClick={handleResetPassword}
            className={`w-full bg-bgGreen hover:bg-hoverGreen transition-all duration-300 text-white text-lg font-semibold py-2 px-4 rounded-md ${isNextButtonDisabled ? ' cursor-not-allowed' : ''}`}
            disabled={isNextButtonDisabled}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold text-black text-center mb-2">Enter verification code sent to {email}</p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={verificationCode}
            onChange={(e) => {
              let value = e.target.value;
              if (value.length > 6) {
                value = value.slice(0, 6);
              }
              setVerificationCode(value);
            }}
            placeholder="Verification Code"
            className="input rounded-md border border-slate-400 p-4 text-base w-full text-black focus:border-borderC"
          />
          <button
            onClick={handleVerifyCode}
            className={`w-full bg-bgGreen hover:bg-hoverGreen transition-all duration-300 text-white text-lg font-semibold py-2 px-4 rounded-md ${isNextButtonDisabled ? ' cursor-not-allowed' : ''}`}
            disabled={isNextButtonDisabled}
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-semibold text-black text-center mb-4">Enter your new password</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="input rounded-md border border-slate-400 p-4 text-base w-full text-black focus:border-borderC"
          />
          <button
            onClick={handleChangePassword}
            className={`w-full bg-bgGreen hover:bg-hoverGreen transition-all duration-300 text-white text-lg font-semibold py-2 px-4 rounded-md ${
              isNextButtonDisabled ? 'cursor-not-allowed' : ''
            }`}
            disabled={isNextButtonDisabled || loading} // Disable the button when loading
          >
            {loading ? 'Loading...' : 'Reset Password'} {/* Change button text based on loading state */}
          </button>
          {success && <p className="text-white fxed inset-0 bg-black px-8 py-2.5 rounded-full ">Password changed successfully... <br />redirecting to Login...</p>} {/* Display success message */}
        </div>
      )}
    </div>
  );
}