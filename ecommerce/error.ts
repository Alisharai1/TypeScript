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

export class CartNotFoundError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

export class InvalidProductQuantityError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

export class OrderNotFoundError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

