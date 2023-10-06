
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import SettingOptions from "./settingComponents/settingOptions";

const getobjectId = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "Email not found"; 
  const res = await fetch(`http://localhost:3000/api/fetch/route?email=${email}`, {
    next: {revalidate: 0}
  })
  const data = await res.json();
  return data._id
}

const getSellerInfo = async () => {
  // const ObjectData = await getobjectId();
  const objectId = await getobjectId()
  const res = await fetch(`http://localhost:3000/api/fetch/fetchaddress?objectId=${objectId}`, {
    next: {revalidate: 0}
  });
  const data = await res.json();
  return data;
}

const fetchProfileImage = async () => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email || "Email not found"; 
    const res = await fetch(`http://localhost:3000/api/upload/image?email=${email}`);

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
    try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email || "Email not found"; 
    const res = await fetch(`http://localhost:3000/api/upload/banner?email=${email}`)
    if (!res.ok) {
      throw new Error(`Error fetching profile image: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile banner:", error);
    throw error; // Rethrow the error to propagate it further
  }
}

export default async function SettingHead() {

  const objectId = await getobjectId() 

  const sellerInfo = await getSellerInfo();
  const seller = sellerInfo.seller;

  let profileImg = null; // Declare profileImg variable before the if statement

  const imgData = await fetchProfileImage();
  if (imgData !== null) {
    profileImg = imgData.profileImage; // Assign a value to profileImg if data is available
  } else {
    console.error("Failed to fetch profile image.");
  }

  const BannerData = await fetchProfileBanner();
  const profileBanner = BannerData.bannerImage;

  return (
      <main>
        <SettingOptions 
            seller={seller} 
            profileImg={profileImg}
            objectId ={objectId}    
            profileBanner={profileBanner}
        />
      </main>
  );
}


