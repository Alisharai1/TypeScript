export type Address = { street: string, city: string, state: string, pincode: number }

export type Contact = { phone: number }

export type User = { id: string, name: string, email: string, address: Address, contact?: Contact, type: UserType }

export type Product = { id: string, name: string, price: number, stock: number }

export type CartItem = { productId: string, qty: number }

export type Cart = { userId: string, items: CartItem[] }

export type OrderItem = { productId: string, qty: number }

export type Order = { id: string, userId: string, items: OrderItem[], status: OrderStatus }

export enum UserType {
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN"
}

export enum OrderStatus {
    FULFILLED = "FULFILLED",
    CANCELLED = "CANCELLED"
}
