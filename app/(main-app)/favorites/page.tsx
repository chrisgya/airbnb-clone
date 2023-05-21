import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/utilities/currentUser";
import getFavoriteListings from "@/app/utilities/favoriteListings";

import Favorites from "./Favorites";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return <Favorites listings={listings} currentUser={currentUser} />;
};

export default ListingPage;
