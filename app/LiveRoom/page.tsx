"use client"

import ChannelInfo from "./channel/ChannelInfo";
import Chat from "./channel/Chat";
import Sidebar from "./channel/Sidebar";
import StreamPlayer from "./channel/StreamPlayer";

export default function ChannelPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-[#0E0E10] lg:grid-cols-4">
  {/* Sidebar */}
  <div className="hidden lg:block md:col-span-1 border-r border-[#3d3939]">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="md:col-span-2 ">
    {/* Stream Player */}
    <StreamPlayer />

    {/* Channel Info */}
    <ChannelInfo />
  </div>

  {/* Chat */}
  <div className="hidden md:block md:col-span-1 border-l border-[#3d3939]">
    <Chat viewerName="Your Viewer Name" />
  </div>
</div>

  );
}
