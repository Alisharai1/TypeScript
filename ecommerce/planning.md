
 Build a TypeScript project to model an E-Commerce System with multiple entities.

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

enum UserType{
    CUSTOMER="CUSTOMER",
    ADMIN="ADMIN" 

}

type Address={street:string,city:string,state:string,pincode:number}
type Contact={phone:number}

type User={id:string, name:string,email:string,address:Address,contact?:Contact,type:UserType}

interface UserService{
    addUser(params:{name:string,email:string,address:Address,contact?:Contact,type:UserType}):User
    updateAddress(address:Address):User
    updateContact(contact:Contact):User
    updateName(name:string):User
    getUserById(id:string):User
    getUserByEmail(email:string):User
    deleteUser(id:string):void
    getUsers(page:number):User[]

}

type Product={id: string,name:string,price:number,stock:number}

interface ProductService{
    addProduct(params:{name:string,price:number,stock:number,userId:string}):Product
    getProductById(id:string):Product
    getProductsByName(name:string):Product[]
    updateProduct(params:{name?:string,price?:number,stock?:number,userId:string}):Product
    deleteProduct(id:string,userId:string):void

}
type CartItem={productId:string,qty:number}
type Cart={userId:string,items:CartItem[]}

interface CartService{
    addCartItem(params:{userId:string,item:CartItem}):CartItem
    deleteCartItem(userId:string, productId:string)
    updateCartItem(params:{userId:string,item:CartItem}):CartItem
    getCartByUserId(userId:string):Cart
}

type OrderItem= {productId:string,qty:number}

type Order={id:string,userId:string,items:OrderItem[]}

interface OrderService{
    createOrder(params:{userId:string,items:OrderItem[]}):Order
    cancelOrder(id:string):boolean
    getOrderById(id:string):Order
}
<!-- 
type CartItem={productId:string,qty:number}
type Cart={userId:string,items:CartItem[]}

const cart:Cart={
userId:"u101"
items:[{}]
}
 -->


 