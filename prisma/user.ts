import prisma from "@/lib/connect";
import { Role } from "@/type";

export const getAll = async (
  perPage: number,
  page: number,
  userId?: string,
) => {
  const users = await prisma.user.findMany({
    where: {
      ...(userId && { id: userId }),
    },
    include: {
      _count: {
        select: {
          threads: true,
          comments: true,
          threadVotes: true,
          commentVotes: true,
        },
      },
    },
    take: perPage,
    skip: perPage * (page - 1),
  });

  return users;
};

export const getOne = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  return user;
};

export const deleteOne = async (id: string) => {
  //TODO: Auth role first
  const user = await prisma.user.delete({
    where: { id: id },
  });
  return user;
};

export const editOne = async (
  id: string,
  body: { name: string; role: Role },
) => {
  const user = await prisma.user.update({
    where: { id: id },
    data: { ...body },
  });

  return user
};

//TODO: Add user here
// interface CreateOne {
//   name: string;
//   email: string;
//   image?: string;
// }
// export const createOne = async (body: CreateOne) => {
//   const data = await prisma.user.create({
//     name: body.name,
//     email: body.email,
//     image: body.image,
//   });
// };
