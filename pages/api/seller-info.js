
// pages/api/seller-info.js

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const getSessionData = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "Email not found"; 
  const res = await fetch(`http://localhost:3000/api/fetch/route?email=${email}`);
  const data = await res.json();
  return data;
};

const getSellerInfo = async () => {
  const sessionData = await getSessionData();
  const objectId = sessionData._id;
  const res = await fetch(`http://localhost:3000/api/fetch/fetchaddress?objectId=${objectId}`);
  const data = await res.json();
  return data;
};

export default async function handler(req, res) {
  const sellerInfo = await getSellerInfo();
  res.status(200).json(sellerInfo);
}
