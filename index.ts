function Love(name: string): void {
    console.log("I love Biryani", name);
}

Love("Ajay")
Love("22")

function greet(name: string): string {
    return "hi" + name

}

const output = greet("Richa")
console.log(output);

let isActive: boolean = true;
console.log(isActive);

let hasPermission = false; // TypeScript infers 'boolean' type
console.log(hasPermission);
hasPermission = true;
console.log(hasPermission);

let ar: string[] = ['Ajay', '12']
console.log(ar);

let ar2: Array<string> = ['Alisha', 'Rai']
console.log(ar2);

// 3 ways to define object
// W1
type User = { name: string, age: number, email: string }

// w2
// interface User1 { name: string, age: number, email: string }

// w3
// export class User {
//     name: string
//     age: number
//     email: string

//     constructor(name: string, age: number, email: string) {
//         this.name = name
//         this.age = age
//         this.email = email
//     }
// }

const obj: User = { name: 'Ritu', age: 28, email: 'alishrai78@gmail.com', }






