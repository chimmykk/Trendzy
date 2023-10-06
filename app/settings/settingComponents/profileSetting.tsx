
import Image from 'next/image';
import { useState } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs'; // Import the delete icon
import { useSession } from 'next-auth/react';
import ProfileUpload from './profilepicUpload';
import ProfileBannerImg from './profileBannerUpload';

export default function ProfileSetting({profileImg,profileBanner, objectId}: {profileImg: any, objectId:any, profileBanner: any}){
  const {data: session} = useSession()

    // Define state variables for each setting
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [bio, setBio] = useState('This is my bio.');

  // Define state variables to track editing mode
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);


  // Function to handle saving changes
  const handleSaveChanges = () => {
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingBio(false);
  };

    return(
        <div className='sm:w-[70%] p-4'>

          {/* Profile Picture Section */}
          <ProfileUpload profileImg={profileImg} objectId={objectId}/>

          {/* Profile Banner Section */}
          <ProfileBannerImg profileBanner={profileBanner} objectId={objectId} />

          {/* Profile Settings Section */}
    <div className="bg-white border rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold">Profile Settings</h3>
      <div className="mt-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <p className="font-bold w-16">Name</p>
            {isEditingName ? (
              <input
                type="text"
                className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <div className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow">
                {name}
              </div>
            )}
            {isEditingName ? (
              <button
                className="ml-2 text-bgGreen"
                onClick={() => setIsEditingName(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="ml-2 text-bgGreen"
                onClick={() => setIsEditingName(true)}
              >
                <BsPencil />
              </button>
            )}
          </div>
          <div className="flex items-center">
            <p className="font-bold w-16">Bio</p>
            {isEditingBio ? (
              <textarea
                className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            ) : (
              <div className="ml-4 border border-gray-300 p-2 rounded-lg font-normal flex-grow">
                {bio}
              </div>
            )}
            {isEditingBio ? (
              <button
                className="ml-2 text-bgGreen"
                onClick={() => setIsEditingBio(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="ml-2 text-bgGreen"
                onClick={() => setIsEditingBio(true)}
              >
                <BsPencil />
              </button>
            )}
          </div>
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
        </div>
    )
}