import { User } from "@prisma/client";
import { JWT } from "@prisma/jwt";
import { Role } from "./type";

declare module "next-auth" {
  interface Session {
    user: User & { role: Role };
  }
}

declare module "next-auth/jwt" {
  type JWT = User;
}
