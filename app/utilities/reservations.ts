import prisma from "@/app/libs/prismadb";
import { Listing, Reservation } from "@prisma/client";

type Params = {
  listingId?: string;
  userId?: string;
  authorId?: string;
};

type TResponse = Reservation & {
  listing: Listing;
};

export default async function getReservations(
  params: Params
): Promise<TResponse[]> {
  const { listingId, userId, authorId } = params;
  const query: any = {};

  if (listingId) {
    query.listingId = listingId;
  }

  if (userId) {
    query.userId = userId;
  }

  if (authorId) {
    query.listing = { userId: authorId };
  }

  return prisma.reservation.findMany({
    where: query,
    include: {
      listing: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
