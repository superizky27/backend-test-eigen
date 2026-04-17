import { prisma } from '../database/prisma';

export const getBooks = async () => {
  return await prisma.book.findMany();
};