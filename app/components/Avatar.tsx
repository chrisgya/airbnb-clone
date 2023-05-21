"use client";
import Image from "next/image";

type TAvatar = {
  src?: string | null;
};

const Avatar = ({ src }: TAvatar) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
      blurDataURL={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
