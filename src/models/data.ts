import { Book, Member } from './types';

export const books: Book[] = [
  { code: "JK-45", title: "Harry Potter", author: "J.K Rowling", stock: 1 },
  { code: "SHR-1", title: "Sherlock Holmes", author: "Arthur Conan Doyle", stock: 1 }
];

export const members: Member[] = [
  { code: "M001", name: "Angga", borrowed: [], penaltyEnd: null },
  { code: "M002", name: "Ferry", borrowed: [], penaltyEnd: null }
];