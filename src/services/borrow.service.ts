import { prisma } from '../database/prisma';

export const borrowBook = async (memberCode: string, bookCode: string) => {
  const member = await prisma.member.findUnique({
    where: { code: memberCode },
    include: { borrows: true }
  });

  const book = await prisma.book.findUnique({
    where: { code: bookCode }
  });

  if (!member || !book) {
    throw new Error("Member or Book not found");
  }

  if (member.penaltyEnd && new Date() < member.penaltyEnd) {
    throw new Error("Member is under penalty");
  }

  if (member.borrows.length >= 2) {
    throw new Error("Cannot borrow more than 2 books");
  }

  if (book.stock <= 0) {
    throw new Error("Book not available");
  }

  // create borrow
  await prisma.borrow.create({
    data: {
      memberId: member.id,
      bookId: book.id,
      borrowDate: new Date()
    }
  });

  // update stock
  await prisma.book.update({
    where: { id: book.id },
    data: { stock: book.stock - 1 }
  });

  return {
    memberCode: member.code,
    bookCode: book.code
  };
};

export const returnBook = async (memberCode: string, bookCode: string) => {
  const member = await prisma.member.findUnique({
    where: { code: memberCode },
    include: { borrows: true }
  });

  const book = await prisma.book.findUnique({
    where: { code: bookCode }
  });

  if (!member || !book) {
    throw new Error("Member or Book not found");
  }

  const borrow = await prisma.borrow.findFirst({
    where: {
      memberId: member.id,
      bookId: book.id
    }
  });

  if (!borrow) {
    throw new Error("This book is not borrowed by member");
  }

  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - borrow.borrowDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // penalty
  if (diffDays > 7) {
    const penaltyDate = new Date();
    penaltyDate.setDate(penaltyDate.getDate() + 3);

    await prisma.member.update({
      where: { id: member.id },
      data: { penaltyEnd: penaltyDate }
    });
  }

  // delete borrow
  await prisma.borrow.delete({
    where: { id: borrow.id }
  });

  // return stock
  await prisma.book.update({
    where: { id: book.id },
    data: { stock: book.stock + 1 }
  });

  return true;
};