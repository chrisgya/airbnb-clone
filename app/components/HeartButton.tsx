"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/app/hooks/useFavorite";
import { TUser } from "@/types";
import PuffLoader from "react-spinners/PuffLoader";

type THeartButton = {
  listingId: string;
  currentUser?: TUser | null;
};

const HeartButton = ({ listingId, currentUser }: THeartButton) => {
  const { isLoading, hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  if (isLoading) {
    return <PuffLoader size={20} color="red" />;
  }
  return (
    <div
      onClick={toggleFavorite}
      className="relative transition cursor-pointer hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
