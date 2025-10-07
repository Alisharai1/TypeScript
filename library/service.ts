import { BookNotFoundError, DuplicateBookError, DuplicateUserError, UserNotFoundError } from "./error";
import { IBookService, IUserService } from "./interface.service";
import { Book, User } from "./model";

class BookService implements IBookService {
    private books: Book[]
    constructor(books: Book) {
        this.books = []
    }

    addBook(id: string, title: string, author: string): Book {
        const book: Book = {
            id, title, author,
            isAvailable: false
        }
        try {
            this.getBookById(id)
            throw new DuplicateBookError(`book already exist with ${id}`)
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
    addUser(userId: string, name: string): User {
        const user: User = {
            userId, name,
            borrowedBooks: []
        }
        try {
            this.getUserById(userId)
            throw new DuplicateUserError(`user already exist with ${userId}`)

        } catch (error) {

        }
        this.users.push(user)
        return user
    }
    getUserById(id: string): User {
        const user = this.users.find(({ userId }) => id === userId)
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
        this.users = this.users.filter(({ userId }) => id !== userId)
    }

}

