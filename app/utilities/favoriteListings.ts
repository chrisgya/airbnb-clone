import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./currentUser";
import { Listing } from "@prisma/client";

export default async function getFavoriteListings(): Promise<Listing[]> {
  const currentUser = await getCurrentUser();

  if (currentUser === null) {
    return [];
  }

  return prisma.listing.findMany({
    where: {
      id: {
        in: [...(currentUser.favoriteIds || [])],
      },
    },
  });
}
