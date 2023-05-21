import getCurrentUser from "@/app/utilities/currentUser";
import getListingById from "@/app/utilities/listingById";
import getReservations from "@/app/utilities/reservations";

import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

type TParams = {
  listingId?: string;
};

const ListingPage = async ({ params }: { params: TParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (listing === null) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default ListingPage;
