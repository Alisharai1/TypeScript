import { Address, Cart, CartItem, Contact, Order, OrderItem, Product, User, UserType } from "./model"

export interface IUserService {
    addUser(params: { name: string, email: string, address: Address, contact?: Contact, type: UserType }): User
    updateAddress(id: string, address: Address): User
    updateContact(id: string, contact: Contact): User
    updateName(id: string, name: string): User
    getUserById(id: string): User
    getUserByEmail(email: string): User
    deleteUser(id: string): void
    getUsers(page: number): User[]
}

export interface IProductService {
    addProduct(params: { name: string, price: number, stock: number, userId: string }): Product
    getProductById(id: string): Product
    getProductsByName(name: string): Product[]
    updateProduct(params: { id:string,name?: string, price?: number, stock?: number, userId: string }): Product
    deleteProduct(id: string, userId: string): void
}

export interface ICartService {
    addCartItem(params: { userId: string, item: CartItem }): CartItem
    deleteCartItem(userId: string, productId: string): void
    updateCartItem(params: { userId: string, item: CartItem }): CartItem
    getCartByUserId(userId: string): Cart
}

export interface IOrderService {
    createOrder(params: { userId: string, items: OrderItem[] }): Order
    cancelOrder(id: string): boolean
    getOrderById(id: string): Order
}
