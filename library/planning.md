Goal: Build a simple system to manage books, users, and borrowing.

🧩 Requirements

Entities: Book, User, LibraryService

Each Book has → id, title, author, isAvailable

Each User has → id, name, borrowedBooks

Methods:

addBook()

borrowBook(userId, bookId)

returnBook(userId, bookId)

listAvailableBooks()

type Book={id:string,title:string,author:string,isAvailable:boolean}:Book
type User={userId:string,name:string,borrowedBooks:number}:User
type LibrarySErivice={user:User,book:Book}