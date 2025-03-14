import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
//import { checkUser } from "@/lib/checkUser"; // Ensure this import works

const isProtectedRoute=createRouteMatcher([
  "/dashboard(.*)",//anything that comes after will be also in this route
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)",
])
export default clerkMiddleware((auth,req)=>{
  console.log("🛠 Clerk Middleware Running...");

  const {userId}= auth()
  console.log("🆔 Retrieved Clerk userId:", userId);

  if(!userId && isProtectedRoute(req)){
    console.log("⛔ Unauthorized access. Redirecting...");
    /*const {redirectToSignIn}= auth()
    return redirectToSignIn(); //Correct function*/
    const signInUrl = new URL("/sign-in", req.url); // ✅ FIX: Manual Redirect
    return NextResponse.redirect(signInUrl);
  }
    
  return NextResponse.next()
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};