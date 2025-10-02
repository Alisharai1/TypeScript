import { DuplicateEmailIdError, UserNotFoundByEmailError, UserNotFoundByIdError, InvalidUserTypeError, ProductNotFoundError } from "./error";
import { IProductService, IUserService } from "./interface.service";
import { Address, Contact, UserType, User, Product } from "./model";
import { v4 } from "uuid"

class UserService implements IUserService {
    private users: User[]

    constructor() {
        this.users = []
    }

    addUser(params: { name: string; email: string; address: Address; contact?: Contact; type: UserType; }): User {
        try {
            this.getUserByEmail(params.email)
            throw new DuplicateEmailIdError(`user already exist with ${params.email}`)
        } catch (error) {
            if (error instanceof DuplicateEmailIdError) {
                throw error
            }
        }
        const newUser: User = { ...params, id: v4() }
        this.users.push(newUser)
        return newUser
    }

    updateAddress(id: string, address: Address): User {
        const user = this.getUserById(id)
        user.address = address
        return user
    }

    updateContact(id: string, contact: Contact): User {
        const user = this.getUserById(id)
        user.contact = contact
        return user
    }

    updateName(id: string, name: string): User {
        const user = this.getUserById(id)
        user.name = name
        return user
    }

    getUserById(id: string): User {
        const user = this.users.find(({ id: userId }) => id === userId)
        if (!user) {
            throw new UserNotFoundByIdError(`no user exist with ${id}`)
        }
        return user
    }

    getUserByEmail(email: string): User {
        const user = this.users.find(({ email: userEmail }) => email === userEmail)
        if (!user) {
            throw new UserNotFoundByEmailError(`no user exist with ${email}`)
        }
        return user
    }

    deleteUser(id: string): void {
        this.users = this.users.filter(({ id: id1 }) => id !== id1)
    }

    getUsers(page: number): User[] {
        const start = (page - 1) * 5
        const end = start + 5
        return this.users.slice(start, end)
    }
}

class ProductService implements IProductService {

    private products: Product[]
    private readonly userService: IUserService
    constructor(userService: IUserService) {
        this.products = []
        this.userService = userService
    }

    private validateUser(userId: string): void {
        const user = this.userService.getUserById(userId)
        if (user.type !== UserType.ADMIN) {
            throw new InvalidUserTypeError("User is not admin")
        }
    }

    addProduct(params: { name: string; price: number; stock: number; userId: string; }): Product {
        this.validateUser(params.userId)
        const product: Product = { ...params, id: v4() }
        this.products.push(product)
        return product
    }

    getProductById(id: string): Product {
        const product = this.products.find(({ id: productId }) => id === productId)
        if (!product) {
            throw new ProductNotFoundError(`product doesn't exist with ${id}`)
        }
        return product
    }

    getProductsByName(name: string): Product[] {
        const products = this.products.filter(({ name: productName }) => name === productName)
        if (!products) {
            throw new ProductNotFoundError(`product doesn't exist with ${name}`)
        }
        return products
    }

    updateProduct(params: { id: string, name?: string; price?: number; stock?: number; userId: string; }): Product {
        this.validateUser(params.userId)
        const product = this.getProductById(params.id)
        if (params.name) {
            product.name = params.name
        }
        if (params.price) {
            product.price = params.price
        }
        if (params.stock) {
            product.stock = params.stock
        }
        return product
    }

    deleteProduct(id: string, userId: string): void {
        this.validateUser(userId)
        this.getProductById(id)
        this.products = this.products.filter(({ id: productId }) => id !== productId)
    }
}
