"use client"

import Image from 'next/image';
import { useState, useEffect, ChangeEvent } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { RiUser3Line } from 'react-icons/ri'
import { useSession } from 'next-auth/react';
import Resizer from 'react-image-file-resizer'; // Import the Resizer function


const MAX_FILE_SIZE_THRESHOLD = 200 * 1024; // 200KB

export default function ProfileUpload({ profileImg, objectId }: { profileImg: any; objectId: any }) {
  const { data: session } = useSession();

  const [profileImage, setProfileImage] = useState(profileImg || null);

  const handleProfilePictureUpdate = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        if (file.size > MAX_FILE_SIZE_THRESHOLD) {
          // Compress the image if it exceeds the threshold
          Resizer.imageFileResizer(
            file,
            400, // Pass original height
            400, // Pass original width
            'JPEG', // Format
            75, // Quality (75%)
            0, // Rotation
            async (uri:any) => {
              const compressedBase64String = uri.split(',')[1];
              const uploadResponse = await uploadImage(compressedBase64String);
              if (uploadResponse.ok) {
                const uploadedImageUrl = await uploadResponse.json();
                console.log(uploadedImageUrl);
                setProfileImage(compressedBase64String);
              } else {
                console.error('Error uploading compressed image:', uploadResponse.statusText);
              }
            }
          );
        } else {
          // Upload the original image if it's within the threshold
          const reader = new FileReader();
          reader.onload = async () => {
            if (typeof reader.result === 'string') {
              const base64String = reader.result.split(',')[1];
              const uploadResponse = await uploadImage(base64String);
              if (uploadResponse.ok) {
                const uploadedImageUrl = await uploadResponse.json();
                console.log('uploaded succesfully', uploadedImageUrl);
                setProfileImage(base64String);
              } else {
                console.error('Error uploading image:', uploadResponse.statusText);
              }
            } else {
              console.error('Error reading file as a string.');
            }
          };

          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleProfilePictureDelete = () => {
    setProfileImage(null);
  };

  async function uploadImage(base64String: string): Promise<any> {
    // Implement the API call to upload the image here
  try {
    const uploadResponse = await fetch('/api/upload/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ objectId, imageData: base64String }),
    });

    return uploadResponse;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Rethrow the error to propagate it further
  }
}




  return(
              <div className="bg-white border rounded-lg p-4 mt-4">
              <h3 className="text-lg font-semibold">Profile Picture</h3>
              <div className="mt-2 flex items-center">
                <div className="w-28 h-28 bg-gray-400 rounded-full mr-4">
                {profileImage ? ( 
                <Image
                    src={`data:image/jpeg;base64,${profileImage}`}
                    width={1000}
                    height={1000}
                    alt="Profile Picture"
                    className="w-full h-full rounded-full"
                />
                ) : (
                session?.user?.image ? (
                    <Image
                    src={session?.user?.image}
                    width={1000}
                    height={1000}
                    alt="Default Profile Picture"
                    className="w-full h-full rounded-full"
                    />
                ) : (
                                <button
                        className=" w-28 h-28 flex justify-center items-center text-bgGreen w rounded-full border-none"
                        
                    >
                        <RiUser3Line size={100} className=" cursor-pointer" />
                    </button>
                )
                )}
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-4 items-center">
                    <label
                      htmlFor="profilePictureInput"
                      className="bg-bgGreen text-white px-2 py-1 rounded mr-2 cursor-pointer"
                    >
                      Update Profile Picture
                    </label>
                    <input
                      type="file"
                      id="profilePictureInput"
                      accept="image/jpeg, image/png, image/gif"
                      style={{ display: 'none' }}
                      onChange={handleProfilePictureUpdate}
                    />
                    <button onClick={handleProfilePictureDelete} className="text-red-500">
                      <BsTrash />
                    </button>
                  </div>
                  <p className="text-gray-500 mt-2">
                    Must be JPEG, PNG, or GIF and cannot exceed 10MB.
                  </p>
                </div>
              </div>
          </div>
  )
}