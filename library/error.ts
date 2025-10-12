export class BookNotFoundError extends Error {
    constructor(msg: string) {

        super(msg)
    }
}

export class UserNotFoundError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

export class DuplicateBookError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}
