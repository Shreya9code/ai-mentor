import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
    console.log("✅ checkUser() is running...");

    const user = await currentUser();
    console.log("🔍 Clerk User Data:", user);

    if (!user) {
      console.error("❌ No clerk authenticated user found");
      return null;
    }
    try {
    console.log(`🔍 Checking user in DB: ${user.id}`);

    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      console.log(`✅ User found in DB: ${loggedInUser.id}`);
      return loggedInUser;
    }
    // Construct the name properly
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const name = `${firstName} ${lastName}`.trim();
    console.log(`🆕 Creating new user: ${name}`);

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: name || "Unknown User",
        imageUrl: user.imageUrl|| "",
        email: user.emailAddresses[0]?.emailAddress|| "",
      },
    });
    console.log(`✅ User created in DB: ${newUser.id}`);
    return newUser;
  } catch (error) {
    console.log("❌ Error creating user:",error.message);
    throw new Error("Failed to check or create user");
  }
};
