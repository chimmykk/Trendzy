"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { status } = useSession();
  const pathname = usePathname()

  useEffect(() => {
    // Move your client-side code inside useEffect
    const scrollContainer = document.querySelector('.overflow-y-scroll');

    if (scrollContainer) {
      scrollContainer.addEventListener('mouseenter', () => {
        scrollContainer.classList.add('show-scrollbar');
      });

      scrollContainer.addEventListener('mouseleave', () => {
        scrollContainer.classList.remove('show-scrollbar');
      });
    }
  }, []); // Empty dependency array to run this effect once on component mount

  
  // Render the sidebar only when the session is authenticated
  if (status === "authenticated") {
    return (
      <div className={` bg-[#efeff1] left-0  z-50 hidden lg:flex flex-col gap-6 py-4 w-fit h-screen px-4 overflow-y-scroll ${pathname === '/startLive' ? "hidden" : "fixed"}`}>
        <h1 className="text-xl font-bold">CATEGORIES</h1>
        <div className="text-base font-semibold flex flex-col">
          <Link href={"./"} className="bg-bgGray rounded-lg px-2 py-2 block w-44">
            <h1>Men&apos;s Fashion</h1>
          </Link>
          <Link href={"./"} className="hover:bg-bgGray rounded-lg px-2 py-2 block w-44">
            <h1>Arts &amp; Handmade</h1>
          </Link>
            <Link href={"./"} className="hover:bg-bgGray rounded-lg px-2 py-2 block w-44">
              <h1>Women clothing</h1>
            </Link>
            
          <Link href={"./"} className="bg-bgGray rounded-lg px-2 py-2 block w-44">
            <h1>Men&apos;s Fashion</h1>
          </Link>
          <Link href={"./"} className="hover:bg-bgGray rounded-lg px-2 py-2 block w-44">
            <h1>Arts &amp; Handmade</h1>
          </Link>
            <Link href={"./"} className="hover:bg-bgGray rounded-lg px-2 py-2 block w-44">
              <h1>Women clothing</h1>
            </Link>
          <Link href={"./"} className="bg-bgGray rounded-lg px-2 py-2 block w-44">
            <h1>Men&apos;s Fashion</h1>
          </Link>
          <Link href={"./"} className="hover:bg-bgGray rounded-lg px-2 py-2 block w-44">
            <h1>Arts &amp; Handmade</h1>
          </Link>
            <Link href={"./"} className="hover:bg-bgGray rounded-lg px-2 py-2 block w-44">
              <h1>Women clothing</h1>
            </Link>
          <Link href={"./"} className="bg-bgGray rounded-lg px-2 py-2 block w-44">
            <h1>Men&apos;s Fashion</h1>
          </Link>
         
        </div>
      </div>
    );
  }

  // Return null if the session is not authenticated (sidebar won't be displayed)
  return 
 null
}
