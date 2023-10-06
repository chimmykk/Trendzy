
"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {  BsTrash } from 'react-icons/bs';

import { useSession } from 'next-auth/react';

export default function ProfileBannerImg({profileBanner, objectId}: {profileBanner : any, objectId: any}) {

  const [profileBannerImage, setProfileBannerImage] = useState(profileBanner || ''); // Default profile banner

  const handleProfileBannerUpdate = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = async () => {
          if (typeof reader.result === 'string') {
            const base64String = reader.result.split(',')[1];

            const uploadResponse = await fetch('/api/upload/banner', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ objectId, bannerImageData: base64String }),
            });

            if (uploadResponse.ok) {
              const uploadedImageUrl = await uploadResponse.json();
              console.log(uploadedImageUrl);
              setProfileBannerImage(base64String);
            } else {
              console.error('Error uploading image:', uploadResponse.statusText);
            }
          } else {
            console.error('Error reading file as a string.');
          }
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };


  // Function to delete the profile banner
  const handleProfileBannerDelete = () => {
    setProfileBannerImage(''); // Set the default profile banner
  };
  
  return(
              <div className="bg-white border rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold">Profile Banner</h3>
                  <div className="mt-2 flex items-center">
                <div className="w-64 h-28 bg-gray-400 flex justify-center items-center rounded-lg mr-4">
                  {/* profile banner here */}
                {profileBannerImage ? (
                  <Image
                  width={1000}
                  height={1000}
                    src={`data:image/jpeg;base64,${profileBannerImage}`}
                    alt="Profile Banner"
                    className="w-full h-full "
                  />
                ):(
                  <h1>Profile Banner</h1>
                )}
                </div>
                <div className="flex flex-col">
          <div className="flex gap-4 items-center">
            <label
              htmlFor="profileBannerInput"
              className="bg-bgGreen text-white px-2 py-1 rounded mr-2 cursor-pointer"
            >
              Update
            </label>
            <input
              type="file"
              id="profileBannerInput"
              accept="image/jpeg, image/png, image/gif"
              style={{ display: 'none' }}
              onChange={handleProfileBannerUpdate}
            />
            <button
              className="text-red-500"
              onClick={handleProfileBannerDelete}
            >
              <BsTrash />
            </button>
          </div>
          <p className="text-gray-500 mt-2">
            File format: JPEG, PNG, GIF (recommended 1200x480, max 10MB)
          </p>
        </div>
              </div>
          </div>
  )
}