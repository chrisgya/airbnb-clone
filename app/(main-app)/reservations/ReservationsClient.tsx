"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { TReservation, TUser } from "@/types";
import httpCalls from "@/app/utilities/httpCalls";

type TReservationsClient = {
  reservations: TReservation[];
  currentUser?: TUser | null;
};

const ReservationsClient = ({
  reservations,
  currentUser,
}: TReservationsClient) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = async (id: string) => {
    setDeletingId(id);

    try {
      await httpCalls.remove(`/api/reservations/${id}`);
      toast.success("Reservation cancelled");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    }
    setDeletingId("");
  };

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
