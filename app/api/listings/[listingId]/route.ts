import { NextResponse } from "next/server";

import getCurrentUser from "@/app/utilities/currentUser";
import prisma from "@/app/libs/prismadb";

type Params = {
  listingId?: string;
};

export async function DELETE(
  request: Request,
  { params: { listingId } }: { params: Params }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
