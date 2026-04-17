export interface BorrowedBook {
  bookCode: string;
  borrowDate: Date;
}

export interface Member {
  code: string;
  name: string;
  borrowed: BorrowedBook[];
  penaltyEnd: Date | null;
}

export interface Book {
  code: string;
  title: string;
  author: string;
  stock: number;
}

export interface BorrowRequest {
  memberCode: string;
  bookCode: string;
}

export interface ReturnRequest {
  memberCode: string;
  bookCode: string;
}