"use client";

import Link from "next/link";
import Image from "next/image";

function NavInfoPage() {
  return (
    <div className=" hidden sm:flex items-center justify-between bg-gray-100/95 py-4 border-b-[1px] text-[#222222]/90 xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="font-bold sm:text-sm sm:max-w-xs md:text-base lg:text-lg md:max-w-md">
        Introducing Airbnb Rooms and 50+ features
      </div>
      <div className="flex gap-2 text-xs font-normal align-middle item-center">
        <div className="flex items-center gap-2 pr-2 border-r-2 hover:underline hover:cursor-pointer">
          <Image
            onClick={() => {}}
            src="/images/learn-more.webp"
            height="30"
            width="53"
            alt="Learn More Video"
          />
          <span>Watch the Rooms film</span>
        </div>
        <div className="hover:text-[#222222]/80 hover:underline transition flex items-center">
          <Link href="/learn-more">Learn more</Link>
        </div>
      </div>
    </div>
  );
}

export default NavInfoPage;
