"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { TReservation, TUser } from "@/types";
import httpCalls from "@/app/utilities/httpCalls";

type TTripsClient = {
  reservations: TReservation[];
  currentUser?: TUser | null;
};

const TripsClient = ({ reservations, currentUser }: TTripsClient) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = async (id: string) => {
    setDeletingId(id);
    try {
      await httpCalls.remove(`/api/reservations/${id}`);
      toast.success("Reservation cancelled");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
    setDeletingId("");
  };

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
