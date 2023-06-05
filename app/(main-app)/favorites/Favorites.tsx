import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { Listing } from "@prisma/client";
import { TUser } from "@/types";

type TFavorites = {
  listings: Listing[];
  currentUser?: TUser | null;
};

const Favorites = ({ listings, currentUser }: TFavorites) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of favorite locations!" />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default Favorites;
