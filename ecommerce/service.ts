import { it } from "node:test";
import { DuplicateEmailIdError, UserNotFoundByEmailError, UserNotFoundByIdError, InvalidUserTypeError, ProductNotFoundError, CartNotFoundError, InvalidProductQuantityError, OrderNotFoundError } from "./error";
import { ICartService, IOrderService, IProductService, IUserService } from "./interface.service";
import { Address, Contact, UserType, User, Product, Cart, CartItem, Order, OrderItem, OrderStatus } from "./model";
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
        // this.validateUser(params.userId)
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

class CartService implements ICartService {
    private carts: Cart[]
    private readonly userService: IUserService
    private readonly productService: IProductService
    constructor(userService: IUserService, productService: IProductService) {
        this.carts = []
        this.productService = productService
        this.userService = userService
    }

    getCartByUserId(userId: string): Cart {
        const cart = this.carts.find(({ userId: uid }) => userId === uid)
        if (!cart) {
            throw new CartNotFoundError(`no cart found for user ${userId}`)
        }
        return cart
    }

    addCartItem(params: { userId: string; item: CartItem; }): CartItem {
        this.userService.getUserById(params.userId)
        const product = this.productService.getProductById(params.item.productId)
        if (params.item.qty > product.stock) {
            throw new InvalidProductQuantityError(`current quantity is ${product.stock}`)
        }

        try {
            const cart = this.getCartByUserId(params.userId)
            const existingItem = cart.items.find(({ productId }) => productId === params.item.productId)

            if (existingItem) {
                existingItem.qty = params.item.qty
                return params.item
            }

            cart.items.push(params.item)
            return params.item

        } catch (error) {
            const cart: Cart
                = { userId: params.userId, items: [params.item] }
            this.carts.push(cart)
            return params.item
        }

    }

    deleteCartItem(userId: string, productId: string): void {
        this.userService.getUserById(userId)
        this.productService.getProductById(productId)
        const cart = this.getCartByUserId(userId)
        cart.items = cart.items.filter(({ productId: id }) => productId !== id)
    }
    updateCartItem(params: { userId: string; item: CartItem; }): CartItem {
        return this.addCartItem(params)
    }
}

class OrderService implements IOrderService {
    private readonly orders: Order[]
    private readonly userService: IUserService
    private readonly productService: IProductService
    constructor(userService: IUserService, productService: IProductService) {
        this.orders = []
        this.userService = userService
        this.productService = productService
    }

    createOrder(params: { userId: string; items: OrderItem[]; }): Order {
        this.userService.getUserById(params.userId)
        params.items.forEach(({ qty, productId, }) => {
            const product = this.productService.getProductById(productId)
            if (product.stock < qty) {
                throw new InvalidProductQuantityError(`${product.name} low stock ${product.stock}`)
            }

            this.productService.updateProduct({
                id: productId,
                stock: product.stock - qty,
                userId: params.userId
            })
        })

        const order: Order = {
            id: v4(),
            userId: params.userId,
            items: params.items,
            status: OrderStatus.FULFILLED
        }

        this.orders.push(order)

        return order
    }

    cancelOrder(id: string): void {
        const order = this.getOrderById(id)
        order.status = OrderStatus.CANCELLED
    }

    getOrderById(id: string): Order {
        const order = this.orders.find(({ id: orderId }) => id === orderId)
        if (!order) {
            throw new OrderNotFoundError(`Order not found with ${id}`)
        }
        return order
    }
}

function boostrap(): { userService: IUserService, productService: IProductService, cartService: ICartService, orderService: IOrderService } {
    const userService = new UserService()
    const productService = new ProductService(userService)
    const cartService = new CartService(userService, productService)
    const orderService = new OrderService(userService, productService)
    return { userService, productService, cartService, orderService }
}

const { orderService } = boostrap()
// boots
