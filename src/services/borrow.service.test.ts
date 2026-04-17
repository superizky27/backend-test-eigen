import { borrowBook, returnBook } from './borrow.service';
import { prisma } from '../database/prisma';

jest.mock('../database/prisma', () => ({
  prisma: {
    member: {
      findUnique: jest.fn(),
      update: jest.fn()
    },
    book: {
      findUnique: jest.fn(),
      update: jest.fn()
    },
    borrow: {
      create: jest.fn(),
      findFirst: jest.fn(),
      delete: jest.fn()
    }
  }
}));

describe('borrowBook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should borrow book successfully', async () => {
    (prisma.member.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'M001',
      borrows: []
    });
    (prisma.book.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'BK1',
      stock: 1
    });
    (prisma.borrow.create as jest.Mock).mockResolvedValue({});
    (prisma.book.update as jest.Mock).mockResolvedValue({});

    const result = await borrowBook('M001', 'BK1');

    expect(result).toEqual({ memberCode: 'M001', bookCode: 'BK1' });
    expect(prisma.borrow.create).toHaveBeenCalledWith({
      data: {
        memberId: 1,
        bookId: 1,
        borrowDate: expect.any(Date)
      }
    });
    expect(prisma.book.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { stock: 0 }
    });
  });

  it('should throw error if member not found', async () => {
    (prisma.member.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(borrowBook('M001', 'BK1')).rejects.toThrow('Member or Book not found');
  });

  it('should throw error if book not found', async () => {
    (prisma.member.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'M001',
      borrows: []
    });
    (prisma.book.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(borrowBook('M001', 'BK1')).rejects.toThrow('Member or Book not found');
  });

  it('should throw error if member under penalty', async () => {
    (prisma.member.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'M001',
      borrows: [],
      penaltyEnd: new Date(Date.now() + 1000)
    });
    (prisma.book.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'BK1',
      stock: 1
    });

    await expect(borrowBook('M001', 'BK1')).rejects.toThrow('Member is under penalty');
  });

  it('should throw error if member has 2 books', async () => {
    (prisma.member.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'M001',
      borrows: [{}, {}]
    });
    (prisma.book.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'BK1',
      stock: 1
    });

    await expect(borrowBook('M001', 'BK1')).rejects.toThrow('Cannot borrow more than 2 books');
  });

  it('should throw error if book not available', async () => {
    (prisma.member.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'M001',
      borrows: []
    });
    (prisma.book.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'BK1',
      stock: 0
    });

    await expect(borrowBook('M001', 'BK1')).rejects.toThrow('Book not available');
  });
});

describe('returnBook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return book successfully without penalty', async () => {
    const borrowDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000); // 5 days ago
    (prisma.member.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'M001'
    });
    (prisma.book.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'BK1',
      stock: 0
    });
    (prisma.borrow.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
      borrowDate
    });
    (prisma.borrow.delete as jest.Mock).mockResolvedValue({});
    (prisma.book.update as jest.Mock).mockResolvedValue({});

    await returnBook('M001', 'BK1');

    expect(prisma.borrow.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(prisma.book.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { stock: 1 }
    });
    expect(prisma.member.update).not.toHaveBeenCalled();
  });

  it('should return book with penalty', async () => {
    const borrowDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
    (prisma.member.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'M001'
    });
    (prisma.book.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'BK1',
      stock: 0
    });
    (prisma.borrow.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
      borrowDate
    });
    (prisma.borrow.delete as jest.Mock).mockResolvedValue({});
    (prisma.book.update as jest.Mock).mockResolvedValue({});
    (prisma.member.update as jest.Mock).mockResolvedValue({});

    await returnBook('M001', 'BK1');

    expect(prisma.member.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { penaltyEnd: expect.any(Date) }
    });
  });

  it('should throw error if member not found', async () => {
    (prisma.member.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(returnBook('M001', 'BK1')).rejects.toThrow('Member or Book not found');
  });

  it('should throw error if book not borrowed', async () => {
    (prisma.member.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'M001'
    });
    (prisma.book.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      code: 'BK1'
    });
    (prisma.borrow.findFirst as jest.Mock).mockResolvedValue(null);

    await expect(returnBook('M001', 'BK1')).rejects.toThrow('This book is not borrowed by member');
  });
});