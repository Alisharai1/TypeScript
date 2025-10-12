export class User {
    private readonly username: string
    private readonly password: string
    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }

    getUsername(): string {
        return this.username
    }

    isEqual(username: string, password: string): boolean {
        return username === this.username && password === this.password
    }
}




/**
 * Build a TypeScript project to model an E-Commerce System with multiple entities.

Your system should include at least these entities:

User – represents a customer or admin.

Product – represents an item for sale with details like name, price, and stock.

Cart – represents a temporary shopping basket for a user before checkout.

Order – represents a completed purchase, linked to a user.

OrderItem – represents a single product inside an order with a quantity.

Requirements:

Each user can have a cart and can checkout to create an order.

Each product has limited stock, which must reduce when an order is placed.

A cart can have multiple products with quantities.

An order should store order items, total price, and order date.

Users can have different roles (e.g., CUSTOMER, ADMIN) using an enum.

Add methods such as:

addProductToCart()

checkout()

getOrderSummary()

reduceStock()
 */
