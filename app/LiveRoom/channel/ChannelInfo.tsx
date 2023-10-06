import { cn } from "../styles/utils";
import { Icons } from "../ui";
import Presence from "./Presence";



export default function ChannelInfo() {
  const isLive = true; // Change to false for testing when not live

  return (
    <div className="space-y-6 border-t border-[#3a3737] px-8 py-6 ">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="grid place-items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={cn(
                "h-16 w-16 rounded-full border-2 border-black bg-gray-500 dark:border-zinc-900",
                isLive && "ring-2 ring-[#25D366]"
              )}
              src={`https://pbs.twimg.com/profile_images/1574852153650384907/RrBQZcJh_400x400.jpg`}
              alt="image"
            />
            {isLive && (
              <div className="absolute mt-14 w-12 rounded-lg border-2 border-black bg-red-600 p-1 text-center text-xs font-bold uppercase text-white transition-all dark:border-zinc-900">
                Live
              </div>
            )}
          </div>
          <div className="text-white">
            <h2 className="text-lg font-medium">The Morning show w// Alex ☕️</h2>
            <div className="flex items-center gap-2">
              <h1 className="text-sm text-bgGreen font-light">@HarryKoren</h1>
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                <Icons.check className="h-3 w-3 text-white " />
              </div>
            </div>
            <div className="-ml-0.5 flex items-center gap-2 pt-1.5 text-xs font-medium">
              <div className={cn("text-sm text-bgGreen")}>
                Coins and Money
              </div>
              <div className={cn("rounded-lg text-white bg-bgDark px-2 py-1")}>
                #Shoes
              </div>
              <div className={cn("rounded-lg text-white bg-bgDark px-2 py-1")}>
                #Men
              </div>
              <div className={cn("rounded-lg text-white bg-bgDark px-2 py-1")}>
                #Trendzy
              </div>
            </div>
          </div>
        </div>
        {/* Replace this with your custom presence component */}
        <Presence />
      </div>
    </div>
  );
}
