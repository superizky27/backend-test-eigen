import { prisma } from '../database/prisma';

export const getMembers = async () => {
  const members = await prisma.member.findMany({
    include: {
      borrows: true
    }
  });

  return members.map((member: any) => ({
    code: member.code,
    name: member.name,
    totalBorrowed: member.borrows.length
  }));
};