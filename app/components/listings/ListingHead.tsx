"use client";

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { TUser } from "@/types";

type TListingHead = {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: TUser | null;
};

const ListingHead = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}: TListingHead) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
          placeholder="blur"
          blurDataURL={imageSrc}
          sizes="auto"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
