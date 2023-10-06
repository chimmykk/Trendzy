

import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";
import { RiUser3Line } from "react-icons/ri"

const getSessionFromServer = async () => {
  const session = await getServerSession(authOptions);
  return session 
}

const fetchProfileImage = async () => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email || "Email not found"; 
    const res = await fetch(`http://localhost:3000/api/upload/image?email=${encodeURIComponent(email)}`);

    if (!res.ok) {
      throw new Error(`Error fetching profile image: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile image:", error);
    return null; // Return null in case of an error
  }
};

const fetchProfileBanner = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "Email not found"; 
  const res = await fetch(`http://localhost:3000/api/upload/banner?email=${encodeURIComponent(email)}`)
  const data = await res.json();
  return data;
}

export default async function ProfilePage() {

  const session = await getSessionFromServer();
  

let profileImg; // Declare the variable here

const imgData = await fetchProfileImage();

if (imgData && imgData.profileImage) {
  profileImg = imgData.profileImage; // Assign the value inside the block
} else {
  // Handle the case where imgData or imgData.profileImage is null or undefined
  console.error('Image data is missing or invalid.');
}
  const BannerData = await fetchProfileBanner();
  const profileBanner = BannerData.bannerImage;  
  
  const user = {
    // profileBanner: "https://via.placeholder.com/1000x500",
    userName: session?.user?.name,
    bio: "Passionate about buying and selling unique items. Reach out to me for inquiries.",
    following: 500,
    followers: 1000,
    reviews: 4.8,
    dmCount: 25,
    itemsSold: 1000,
  };

  return (
    <div className="ml-4 bg-white">
      {/* Profile Banner */}
      <div className="bg-cover bg-center h-64 relative"> 
        <div
          className="absolute inset-0 flex items-end"
          style={{ 
            backgroundImage: `url(data:image/jpeg;base64,${profileImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: "center center", 
            backgroundSize: 'cover', // Optional: To cover the entire container
          }}
        >
          {/* Profile Image */}
          <div
            className="relative top-1/2 transform -translate-y-1/2 w-32 h-32 left-3"
          >
                {profileImg ? ( // Check if profileImage is available
                <Image
                    src={`data:image/jpeg;base64,${profileImg}`}
                    width={1000}
                    height={1000}
                    alt="Profile Picture"
                    className="w-full h-full rounded-full"
                />
                ) : (
                // Display session Img if there is no profile pic in the rilso mongodb
                session?.user?.image ? (
                    <Image
                    src={session?.user?.image}
                    width={1000}
                    height={1000}
                    alt="Default Profile Picture"
                    className="w-full h-full rounded-full"
                    />
                ) : (
                    // If no session image, display a React icon (e.g., a placeholder user icon)
                                <button
                        className=" flex justify-center items-center text-bgGreen w rounded-full border-none"
                        
                    >
                        <RiUser3Line size={100} className=" cursor-pointer" />
                    </button>
                )
                )}
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 mt-16">
        <h2 className="text-2xl font-semibold">{user.userName}</h2>
        <p className="text-gray-600">{user.bio}</p>

        {/* Follow Stats */}
        <div className="mt-4 flex">
          <div className="mr-6">
            <p className="font-semibold">{user.following}</p>
            <p className="text-gray-600">Following</p>
          </div>
          <div className="mr-6">
            <p className="font-semibold">{user.followers}</p>
            <p className="text-gray-600">Followers</p>
          </div>
          <div className="mr-6">
            <p className="font-semibold">{user.reviews}</p>
            <p className="text-gray-600">Reviews</p>
          </div>
          <div className="mr-6">
            <p className="font-semibold">{user.itemsSold}</p>
            <p className="text-gray-600">Items Sold</p>
          </div>
        </div>

        {/* DM Button */}
        <button className="bg-bgGreen text-white px-4 flex items-center  py-2 rounded-full mt-4">
          <FaEnvelope className="mr-2" />
          Send Message
        </button>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-end mt-4">
        <button className="bg-bgGreen text-white px-4 py-2 rounded-full">Edit Profile</button>
      </div>
    </div>
  );
}

