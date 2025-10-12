import { Book } from "./model";
import { User } from "./model";


export interface IBookService {
    isAvailable: boolean;
    addBook(title: string, author: string): Book
    getBookById(id: string): Book
    updateBook(id: string, title: string, author: string): Book
    deleteBook(id: string): void
}

export interface IUserService {
    addUser(name: string): User
    getUserById(id: string): User
    updateUser(userId: string, name: string): User
    deleteUser(id: string): void
}
export interface ILibraryService {

    borrowBook(userId: string, bookId: string): string

    returnBook(userId: string, bookId: string): Book

    listAvailableBooks(): Book[]
}