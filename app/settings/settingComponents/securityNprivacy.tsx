"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { BsPencil } from 'react-icons/bs'; // Import the delete icon

export default function SecurityPrivacy() {
  const { data: session } = useSession();

  const [email, setEmail] = useState(session?.user?.email || '');
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState( ''); // Initialize with session data or empty string
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);

  // Function to handle saving changes
  const handleSaveChanges = () => {
    setIsEditingEmail(false);
    setIsEditingPhoneNumber(false);
    // Save email and phone number changes here
  };

  return (
    <div className="bg-white border rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold">Profile Settings</h3>
      <div className="mt-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <p className="font-bold w-16">Email</p>
            {isEditingEmail ? (
              <input
                type="email"
                className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <div className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow">
                {email}
              </div>
            )}
            {isEditingEmail ? (
              <button
                className="ml-2 text-bgGreen"
                onClick={() => setIsEditingEmail(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="ml-2 text-bgGreen"
                onClick={() => setIsEditingEmail(true)}
              >
                <BsPencil />
              </button>
            )}
          </div>
          {/* Phone Number Field */}
          <div className="flex items-center">
            <p className="font-bold w-16">Phone Number</p>
            {isEditingPhoneNumber ? (
              <input
                type="tel"
                className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            ) : (
              <div
                className={`ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow ${phoneNumber ? 'cursor-pointer' : ''}`}
                onClick={() => setIsEditingPhoneNumber(true)}
              >
                {phoneNumber || 'Add a phone number'}
              </div>
            )}
          </div>

          <button
            className="bg-red-500 w-fit text-white self-start px-2 py-1 rounded mr-4"
            // onClick={}
          >
            Reset Password
          </button>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-bgGreen text-white px-2 py-1 rounded"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
