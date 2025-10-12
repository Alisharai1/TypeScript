import IPerson from "./iservice";
import { Person } from "./model";

export class PersonService implements IPerson {
    introduce(person: Person): string {
        return (`Hi, I am ${person.name} and I am ${person.age} years old`);

    }
}

const obj = new PersonService()
obj.introduce({ name: "Ajay", age: 78 })

const person: Person = { name: "Alisha", age: 28 }
obj.introduce(person)