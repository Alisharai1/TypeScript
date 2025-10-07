import { Book } from "./model";
import { User } from "./model";


export interface IBookService {
    addBook(id: string, title: string, author: string): Book
    getBookById(id: string): Book
    updateBook(id: string, title: string, author: string): Book
    deleteBook(id: string): void
}

export interface IUserService {
    addUser(userId: string, name: string): User
    getUserById(id: string): User
    updateUser(userId: string, name: string): User
    deleteUser(id: string): void
}