interface Animal {
    makeSound(): void
}

class Dog implements Animal {
    makeSound(): void {
        console.log("barks");

    }

}

class Cat implements Animal {
    makeSound(): void {
        console.log("meow");

    }
}


let obj: Animal
obj = new Dog()
obj.makeSound()
obj = new Cat()
obj.makeSound()



