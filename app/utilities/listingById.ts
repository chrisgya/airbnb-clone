import prisma from "@/app/libs/prismadb";
import { Listing, User } from "@prisma/client";

type Params = {
  listingId?: string;
};

type TResponse =
  | (Listing & {
      user: Omit<User, "hashedPassword">;
    })
  | null;

export default async function getListingById({
  listingId,
}: Params): Promise<TResponse> {
  return prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      user: true,
    },
  });
}
