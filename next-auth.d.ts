import { User } from "@prisma/client";
import { JWT } from "@prisma/jwt";

declare module "next-auth" {
  interface Session {
    user: User
  }
}

declare module "next-auth/jwt" {
  type JWT = User
}
