import { BookNotFoundError, DuplicateBookError, UserNotFoundError } from "./error";
import { IBookService, ILibraryService, IUserService } from "./interface.service";
import { Book, User } from "./model";
import { v4 } from "uuid"

class BookService implements IBookService {
    private books: Book[]
    isAvailable: boolean;
    constructor(books: Book, isAvailable: boolean) {
        this.books = []
        this.isAvailable = isAvailable
    }

    addBook(title: string, author: string): Book {

        const book: Book = {
            id: v4(),
            title, author,
            isAvailable: false
        }
        try {
            this.getBookById(book.id)
            throw new DuplicateBookError(`book already exist with ${book.id}`)
        } catch (error) {
            if (error instanceof DuplicateBookError)
                throw error
        }
        this.books.push(book)
        return book

    }

    getBookById(id: string): Book {
        const book = this.books.find(({ id: bookId }) => id === bookId)
        if (!book) {
            throw new BookNotFoundError(`book not found with ${id}`)
        }
        return book
    }

    updateBook(id: string, title: string, author: string): Book {
        const book = this.getBookById(id)
        book.title = title
        book.author = author
        return book
    }

    deleteBook(id: string): void {
        this.getBookById(id)
        this.books = this.books.filter(({ id: bookId }) => id !== bookId)
    }
}


class UserService implements IUserService {
    private users: User[]
    constructor() {
        this.users = []
    }

    addUser(name: string): User {
        const user: User = {
            id: v4(),
            name,
            borrowedBooks: []
        }
        this.users.push(user)
        return user
    }

    getUserById(id: string): User {
        const user = this.users.find(({ id: userId }) => id === userId)
        if (!user) {
            throw new UserNotFoundError(`user doesn't exist with ${id}`)
        }
        return user
    }

    updateUser(userId: string, name: string): User {
        const user = this.getUserById(userId)
        user.name = name
        return user
    }

    deleteUser(id: string): void {
        this.getUserById(id)
        this.users = this.users.filter(({ id: userId }) => id !== userId)
    }
}

class LibraryService implements ILibraryService {
    userService: IUserService
    bookService: IBookService
    private books: Book[]

    constructor(userService: IUserService, bookService: IBookService, books: Book[]) {
        this.userService = userService
        this.bookService = bookService
        this.books = books
    }

    borrowBook(userId: string, bookId: string): string {
        this.userService.getUserById(userId)
        this.bookService.getBookById(bookId)
        this.bookService.isAvailable = false
        this.books.length - 1
        return (`book has been borrowed ${bookId}`)
    }

    returnBook(userId: string, bookId: string): Book {
        this.userService.getUserById(userId)
        const book = this.bookService.getBookById(bookId)
        this.bookService.isAvailable = true
        this.books.push(book)
        return book
    }

    listAvailableBooks(): Book[] {
        return this.books.filter(() => {
            if (!this.bookService.isAvailable) {
                return true
            }
            return false
        })
    }
}


