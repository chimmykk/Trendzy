import Link from "next/link"
import LiveStreamCard from "./ui/liveStreamCard"

export default function RecommendLive() {
  // Create an array of data objects, each representing a LiveStreamCard
  const liveStreamData = [
    {
      href: './livestream/1',
      imageSrc: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      name: 'Harry Koren',
      streamTitle: 'New Comics + Adult Show ',
      viewerCount: '1.7k',
      profileImg: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      category: 'shoes',
    },
    {
      href: './livestream/2',
      imageSrc: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      name: 'Another Name',
      streamTitle: 'Another Stream Titleaawdawduadiabawdadaddwww',
      viewerCount: '2.5k',
      profileImg: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      category: 'gaming',
    },
        {
      href: './livestream/2',
      imageSrc: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      name: 'Another Name',
      streamTitle: 'Another Stream Titleaawdawduadiabawdadaddwww',
      viewerCount: '2.5k',
      profileImg: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      category: 'gaming',
    },    {
      href: './livestream/2',
      imageSrc: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      name: 'Another Name',
      streamTitle: 'Another Stream Titleaawdawduadiabawdadaddwww',
      viewerCount: '2.5k',
      profileImg: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      category: 'gaming',
    },
        {
      href: './livestream/2',
      imageSrc: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      name: 'Another Name',
      streamTitle: 'Another Stream Titleaawdawduadiabawdadaddwww',
      viewerCount: '2.5k',
      profileImg: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      category: 'gaming',
    },
        {
      href: './livestream/2',
      imageSrc: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      name: 'Another Name',
      streamTitle: 'Another Stream Titleaawdawduadiabawdadaddwww',
      viewerCount: '2.5k',
      profileImg: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      category: 'gaming',
    },
    
        {
      href: './livestream/2',
      imageSrc: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      name: 'Another Name',
      streamTitle: 'Another Stream Titleaawdawduadiabawdadaddwww',
      viewerCount: '2.5k',
      profileImg: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      category: 'gaming',
    },    {
      href: './livestream/2',
      imageSrc: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      name: 'Another Name',
      streamTitle: 'Another Stream Titleaawdawduadiabawdadaddwww',
      viewerCount: '2.5k',
      profileImg: 'https://lh3.googleusercontent.com/OM4iY16dscdL_mfe4RADDWxDdZZ1yNWfQBAZKKWmy2Z8_1Intt7vuBfGth4Anvd0pcjyYZR2Ctz3tIaJM9asxLXysKktP2XTLzkWnYY',
      category: 'gaming',
    },
    
    // Add more data objects as needed
  ];

  return (
    <div className="my-4 mt-8 px-5 sm:px-6 lg:px-4">
      <div className=" text-lg sm:text-2xl font-semibold text-left flex gap-2">
        <Link href={'/'} className="text-bgGreen">
          Live channels
        </Link>
        <h1>We Think You&apos;ll Like</h1>
      </div>
      <div className='py-8 grid grid-cols-fluid-mobile md:grid-cols-fluid gap-5 md:gap-4'>
        {/* Map over the liveStreamData array and render LiveStreamCard components */}
        {liveStreamData.map((stream, index) => (
          <LiveStreamCard
            key={index} // Make sure to provide a unique key for each component
            href={stream.href}
            imageSrc={stream.imageSrc}
            name={stream.name}
            streamTitle={stream.streamTitle}
            viewerCount={stream.viewerCount}
            profileImg={stream.profileImg}
            category={stream.category}
          />
        ))}
      </div>
    </div>
  );
}
