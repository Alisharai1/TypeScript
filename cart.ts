type CartItem = { id: number, name: string, price: number, qty: number }
type CartItem2= {idiot:string}

interface ICart {
    addItem(item: CartItem): CartItem
    removeItem(id: number): void
    getTotalPrice(): number
}

class CartService implements ICart {
    items: CartItem[]
    constructor() {
        this.items = []

    }
    addItem(item: CartItem): CartItem {
        this.items.push(item)
        return item

    }
    removeItem(id: number): void {
        this.items = this.items.filter(({ id: id1 }) => id !== id1)

    }
    getTotalPrice(): number {
        let totalPrice = 0
        this.items.forEach(({ qty, price }) => {
            totalPrice += qty * price
        })
        return totalPrice
    }
}

const cartService = new CartService()
let item = cartService.addItem({ id: 1, name: "Utensils", price: 8000, qty: 2 })
let item1 = cartService.addItem({ id: 2, name: "Electronics", price: 80000, qty: 5 })
// console.log(item);
// console.log(item1);
console.log(cartService.items);
const totalPrice = cartService.getTotalPrice()
console.log(totalPrice);
cartService.removeItem(2)
console.log(cartService.items);






