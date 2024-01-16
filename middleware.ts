// import { authMiddleware } from "@clerk/nextjs";

// // // This example protects all routes including api/trpc routes
// // // Please edit this to allow other routes to be public as needed.
// // // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// export default authMiddleware({
//   //   //all of our routes are by default protected
//   publicRoutes: ["/", "/api/conversation"], // landing page is unprotected, both logged in and logged out users can see it
// });

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Add the route you want to make public to the array below
  publicRoutes: ["/api/conversation"],
});
