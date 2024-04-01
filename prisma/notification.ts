import prisma from "@/lib/connect";

export const getAll = async (
  isExpired: boolean,
  isStarted: boolean,
  take?: number,
  skip?: number,
) => {
  const data = await prisma.notification.findMany({
    where: {
      ...(isExpired && { isExpired }),
      ...(isStarted && { isStarted }),
    },
    include: {
      user: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    orderBy: {
      startFrom: "desc",
    },
    take: take || 5,
    skip: skip || 0,
  });
  return data;
};

export const deleteOne = async (id: string) => {
  // TODO: Check Role or Author of this Notification first
  const data = await prisma.notification.delete({
    where: {
      id: id,
    },
  });
  return data;
};

interface CreateOne {
  title: string;
  content: string;
  startFrom: Date;
  endTo?: Date;
  userEmail: string;
}

export const createOne = async (body: CreateOne) => {
  //TODO: Check Role first
  const data = await prisma.notification.create({
    data: { ...body },
  });
  return data;
};

interface EditOne {
  title: string;
  content: string;
  startFrom: Date;
  endTo?: Date;
  isExpired?: boolean;
  isStarted?: boolean;
}
export const editOne = async (id: string, body: EditOne) => {
  //TODO: Check Role or Author of this notification first
  const data = await prisma.notification.update({
    where: {
      id: id,
    },
    data: { ...body, isModified: true },
  });

  return data;
};
