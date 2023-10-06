"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ResponsiveCarousel from '../components/Carousel';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import RecommendLive from '@/components/liveRecommend';
import Footer from './footer';

export default function Home() {

  const router = useRouter()

   useEffect(() => {
    router.prefetch("/home");
  }, [router]);

  const { status } = useSession();

  if (status === "authenticated") {
    redirect('/home')
  }

  return (
  <main className="z-0  lg:ml-[-209px] p-[-14px] pt-4 h-fit">
    <div className=" fade-container">
      <ResponsiveCarousel />        
    </div>

    <div className="mt-12 mx-auto text-center">
      <h1 className=" text-xl md:text-4xl my-4 font-extrabold">
        Watch, <span className='text-bgGreen'>&apos;Interact&apos;</span>, <span className='stroke-black'>&apos;Shop&apos;</span> – Live Marketplace
      </h1>
      <div className="flex mt-7 items-center content-center gap-4 text-lg font-semibold justify-center">
        <Link
          href={'/livestream'}
          className=" button px-4 py-3 bg-[#fff] transition-hover duration-300 border rounded-lg border-black"
        >
          Join the Stream
        </Link>
        <Link
          href={'/register'}
          className=" button bg-bgGreen transition-hover duration-300 text-white border rounded-lg border-bgDark hover:border-black"
        >
          Sell Live
        </Link>
      </div>
    </div>

    <div>
      <RecommendLive />
    </div>
    <Footer />
</main>

  );
}