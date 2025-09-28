class User {
    name: string
    age: number
    email: string

    constructor(name: string, age: number, email: string) {
        this.name = name
        this.age = age
        this.email = email
    }

    getUser(): {
        name: string;
        age: number;
        email: string;
    } {
        return { name: this.name, age: this.age, email: this.email }
    }

}

const user = new User("Alisha", 28, "arai@gmail.com")
const newUser = user.getUser()
console.log(newUser);
