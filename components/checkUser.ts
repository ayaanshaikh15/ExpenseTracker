import { currentUser } from "@clerk/nextjs/server";
import { cache } from "react";
import { prisma } from "../lib/prisma";

export const checkUser = cache(async () => {
  const user = await currentUser();

  if (!user) return null;

  // ✅ Single DB call — upsert atomically handles create + update
  // ✅ Fixes race condition (no separate find → create gap)
  // ✅ Keeps name/avatar in sync with Clerk automatically
  const loggedUser = await prisma.user.upsert({
    where: {
      clerkUserId: user.id,
    },
    update: {
      // Sync latest data from Clerk on every login
      email: user.emailAddresses[0]?.emailAddress,
      name: user.fullName,
      imageUrl: user.imageUrl,
    },
    create: {
      clerkUserId: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      name: user.fullName,
      imageUrl: user.imageUrl,
    },
    include: {
      records: {
        orderBy: { createdAt: "desc" }, // latest first
      },
    },
  });

  return loggedUser;
});