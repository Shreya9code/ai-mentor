import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
//import jwt from "jsonwebtoken";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)", //anything that comes after will be also in this route
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)",
]);
export default clerkMiddleware(async (auth, req) => {
  console.log("🛠 Clerk Middleware Running...");

  console.log("🔍 Auth Object:", auth());
  const { userId } =await auth();
  console.log("🆔 Retrieved Clerk userId frm middleware:", userId);

  if (!userId && isProtectedRoute(req)) {
    console.log("⛔ Unauthorized access. Redirecting...");
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
