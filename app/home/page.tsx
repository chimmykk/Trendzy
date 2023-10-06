import Link from "next/link"


function Home() {
  return(
    <div className='px-5 bg-[#f7f7f8] min-h-screen overflow-y-scroll sm:px-6 lg:pl-6 '>
      <div className=''>
        <div><h1 className='text-lg font-semibold'>Featured channels</h1></div>  
        {/* live items */}
        <div className=' py-8 flex flex-col sm:flex-row items-center gap-8 '>
          <Link href={'/'} className=' flex flex-col gap-3 '>
            <div className='w-[200px] rounded-lg h-[250px] text-white  bg-black relative'>
              <div className='bg-red-600 px-3 text-sm py-1 rounded-lg inline-block absolute top-2 left-2'>LIVE</div>
              <h1 className='absolute pl-2 top-3 left-16 text-sm'>1.7k</h1>
            </div>
            <div className=' inline-block text-base '>
              <h1 className='text-base text-black font-bold'>Harry Koren</h1>
              <h1>New Comics + Adult Show</h1>
            </div>
          </Link>
          {/* 2 */}
          <Link href={'/'} className=' flex flex-col gap-3 '>
            <div className='w-[200px] rounded-lg h-[250px] text-white  bg-black relative'>
              <div className='bg-red-600 px-3 text-sm text-white py-1 rounded-lg inline-block absolute top-2 left-2'>LIVE</div>
              <h1 className='absolute pl-2 top-3 left-16 text-sm'>1.7k</h1>
            </div>
              <div className=' inline-block text-base '>
                <h1 className='text-base text-black font-bold'>Harry Koren</h1>
                <h1>New Comics + Adult Show</h1>
              </div>
          </Link>
        </div>
      </div> 
    </div>
  )
}

export default Home; // Apply the middleware to the page
