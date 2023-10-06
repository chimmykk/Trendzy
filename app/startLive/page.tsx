import Link from "next/link"
import CreateStream from "./components/createStreamModal"

export default function LiveStream(){
    return(
        <main className="flex  flex-col">
            <nav className={`bg-[#1E1F22] text-white z-50 px-8 py-3 flex items-center justify-between sm:px-6 lg:px-4 sticky shadow backdrop-blur-lg top-0`}>
                <Link href={'/'} className=" text-2xl font-extrabold">
                    <h1>Trend</h1>
                </Link>    
                <div className="flex gap-1">
                    <div className=" w-8 h-8"> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"> <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                    </div>
                </div> 
            </nav>
            <div className="bg-black w-full">
                <CreateStream />
            </div>
        </main>
    )
}