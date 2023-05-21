import prisma from "@/app/libs/prismadb";
import { TUser } from "@/types";
import getSession from "./session";

export default async function getCurrentUser(): Promise<TUser | null> {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    return prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
  } catch (error: any) {
    console.log("user not authenticated", error);
    return null;
  }
}
