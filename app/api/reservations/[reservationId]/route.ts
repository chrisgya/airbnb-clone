import { NextResponse } from "next/server";

import getCurrentUser from "@/app/utilities/currentUser";
import prisma from "@/app/libs/prismadb";

type Params = {
  reservationId?: string;
};

export async function DELETE(
  _request: Request,
  { params: { reservationId } }: { params: Params }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
