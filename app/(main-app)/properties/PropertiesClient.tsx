"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import httpCalls from "../../utilities/httpCalls";
import { Listing } from "@prisma/client";
import { TUser } from "@/types";

type TProperties = {
  listings: Listing[];
  currentUser?: TUser | null;
};

const Properties = ({ listings, currentUser }: TProperties) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = async (id: string) => {
    setDeletingId(id);

    try {
      await httpCalls.remove(`/api/listings/${id}`);
      toast.success("Listing deleted");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
    setDeletingId("");
  };

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Properties;
