import { Role } from "@prisma/client";
import withAuth from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/management")) {
        if (!token) return !!token;
        return (
          token.role === Role.ADMIN ||
          token.role === Role.MODERATOR ||
          token.role === Role.WRITER
        );
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/management/:path*"],
};
