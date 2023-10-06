
import React, { useState } from "react";

export default function Sidebar() {
  // Define state to track the active navigation item
  const [activeNavItem, setActiveNavItem] = useState("Auction");

 const contentMap: Record<string, string> = {
    Auction: "Auction content goes here",
    BuyNow: "Buy Now content goes here",
    GiveAways: "GiveAways content goes here",
    Sold: "Sold content goes here",
  };

  return (
    <main className="text-white fixed inset-y-0 left-0 px-4 py-8">
      <h1 className="text-xl font-bold mb-4">The Morning show w// Alex ☕️</h1>
      <nav className="border-b border-[#353232] mt-8">
        <ul className="flex gap-6 py-2">
          <li
            className={`cursor-pointer ${
              activeNavItem === "Auction" ? "border-b-2 text-bgGreen border-borderC" : ""
            }`}
            onClick={() => setActiveNavItem("Auction")}
          >
            Auction
          </li>
          <li
            className={`cursor-pointer ${
              activeNavItem === "BuyNow" ? "border-b-2 text-bgGreen border-borderC" : ""
            }`}
            onClick={() => setActiveNavItem("BuyNow")}
          >
            Buy Now
          </li>
          <li
            className={`cursor-pointer ${
              activeNavItem === "GiveAways" ? "border-b-2 text-bgGreen border-borderC" : ""
            }`}
            onClick={() => setActiveNavItem("GiveAways")}
          >
            GiveAways
          </li>
          <li
            className={`cursor-pointer ${
              activeNavItem === "Sold" ? "border-b-2 text-bgGreen border-borderC" : ""
            }`}
            onClick={() => setActiveNavItem("Sold")}
          >
            Sold
          </li>
        </ul>
      </nav>
      <div className="mt-4">
        {/* Render content based on activeNavItem */}
        {contentMap[activeNavItem]}
      </div>
    </main>
  );
}
