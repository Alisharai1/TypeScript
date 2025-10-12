import { User } from "./user"
describe(User.name, () => {
    const userName = "Alisha"
    const pwd = "a@1"
    const obj = new User(userName, pwd)
    test("check instance", () => {
        expect(obj).toBeInstanceOf(User)
    })
    describe(User.prototype.getUsername.name, () => {
        test("should return correct user name", () => {

            const output = obj.getUsername()
            expect(output).toBe(userName)
        })

    })
    describe(User.prototype.isEqual.name, () => {
        test("should return false for incorrect password", () => {
            const output = obj.isEqual(userName, "incorrect pwd")
            expect(output).toBeFalsy()
        })

        test("should return false for incorrect userName", () => {
            const output = obj.isEqual("incorrect userName", pwd)
            expect(output).toBeFalsy()

        })

        test("should return false for incorrect password and userName", () => {
            const output = obj.isEqual("incorrect userName", "incorrect pwd")
            expect(output).toBeFalsy()

        })
        test("should return true for correct password and userName", () => {
            const output = obj.isEqual(userName, pwd)
            expect(output).toBeTruthy()

        })
    })

})