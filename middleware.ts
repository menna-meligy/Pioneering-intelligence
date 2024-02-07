export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Add the route you want to make public to the array below
  publicRoutes: ["/api/conversation", "/", "/api/webhook"],
});
