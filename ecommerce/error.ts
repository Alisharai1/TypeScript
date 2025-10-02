export class UserNotFoundByIdError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

export class UserNotFoundByEmailError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

export class DuplicateEmailIdError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

export class InvalidUserTypeError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

export class ProductNotFoundError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}