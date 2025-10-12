import { Person } from "./model"
import { PersonService } from "./service"


describe(PersonService.name, () => {
    const personService = new PersonService()

    test("check instance", () => {
        expect(personService).toBeInstanceOf(PersonService)

    })
    describe(PersonService.prototype.introduce.name, () => {
        test("should return introduction of person", () => {

            const person: Person = {
                name: "Alisha",
                age: 78
            }
            const output = personService.introduce(person)

            expect(output).toBe(`Hi, I am ${person.name} and I am ${person.age} years old`)
            expect(output).toContain(person.name)
            expect(output).toContain(person.age.toString())

        })
    })
})