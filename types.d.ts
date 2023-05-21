import { Listing, Reservation, User } from "@prisma/client";

type TReservation = Reservation & {
  listing: Listing;
};

type TUser = Omit<User, "hashedPassword">;

type TKeyValue = { [key: string]: string | number | boolean | undefined };
