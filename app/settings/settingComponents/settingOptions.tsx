"use client"

import { useState } from 'react';
import PaymentInformation from './paymentInfo';
import ProfileSetting from './profileSetting';
import ShippingInfo from './shippingInfo';
import SellersInfo from './sellersInfo'; // Import the SellersInfo component
import SecurityPrivacy from './securityNprivacy';

interface SettingOptionsProps {
  seller: any;
  profileImg: any;
  objectId: any;
  profileBanner: any;
}

const SettingOptions = (
  { seller, profileImg, objectId, profileBanner }: SettingOptionsProps
  ) => {


  const [activeItem, setActiveItem] = useState('Profile');

  const handleClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <div className="p-10  bg-bgGray">
      <h1 className="text-4xl font-bold">Settings</h1>
      <div className="flex border-b gap-6 pb-2 text-lg border-gray-300 mt-4">
        <div
          className={`cursor-pointer ${
            activeItem === 'Profile' ? 'text-green-500 ' : 'text-gray-600'
          }`}
          onClick={() => handleClick('Profile')}
        >
          Profile
        </div>
        <div
          className={`cursor-pointer ${
            activeItem === 'Shipping Information' ? 'text-green-500 ' : 'text-gray-600'
          }`}
          onClick={() => handleClick('Shipping Information')}
        >
          Shipping Information
        </div>
        <div
          className={`cursor-pointer ${
            activeItem === 'Payment Information' ? 'text-green-500 ' : 'text-gray-600'
          }`}
          onClick={() => handleClick('Payment Information')}
        >
          Payment Information
        </div>
        <div
          className={`cursor-pointer ${
            activeItem === "Seller's Info" ? 'text-green-500 ' : 'text-gray-600'
          }`}
          onClick={() => handleClick("Seller's Info")} // Handle click for Seller's Info
        >
                {'Seller\'s Info'}
        </div>
        <div
          className={`cursor-pointer ${
            activeItem === "Security and Privacy" ? 'text-green-500 ' : 'text-gray-600'
          }`}
          onClick={() => handleClick("Security and Privacy")} // Handle click for Seller's Info
        >
          Security and privacy
        </div>
      </div>

      {activeItem === 'Profile' && (
        <ProfileSetting 
          profileImg={profileImg} 
          profileBanner={profileBanner} 
          objectId={objectId}
        />
      )}

      {activeItem === 'Shipping Information' && (
        <ShippingInfo />
      )}

      {activeItem === 'Payment Information' && (
        <PaymentInformation />
      )}

      {activeItem === "Seller's Info" && ( // Render SellersInfo for Seller's Info
        <SellersInfo seller={seller}/>
      )}

      {activeItem === "Security and Privacy" && ( // Render SellersInfo for Seller's Info
        <SecurityPrivacy/>
      )}
    </div>
  );
};

export default SettingOptions;
