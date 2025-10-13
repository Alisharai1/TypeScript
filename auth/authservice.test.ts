import { AuthService } from "./service";

describe(AuthService.name, () => {
    const userObj = {
        username: "Alisha Rai",
        password: "a@123"
    }
    let obj: AuthService
    beforeEach(() => {
        obj = new AuthService()
        obj.register(userObj.username, userObj.password)
    })

    // afterEach(() => {
    //     console.log("after each");
    // })

    // afterAll(() => {
    //     console.log("after all");

    // })

    // beforeAll(() => {
    //     console.log("before all");

    // })

    test("should check instance", () => {
        expect(obj).toBeInstanceOf(AuthService)
    })
    describe(AuthService.prototype.getUserByUsername.name, () => {


        test("should return user  successfully", () => {
            const user = obj.getUserByUsername(userObj.username)
            expect(user).toEqual(userObj)
        })

        test("should return undefined successfully ", () => {
            const user = obj.getUserByUsername("incorrect userName")
            expect(user).toEqual(undefined)

        })

    })

    describe(AuthService.prototype.login.name, () => {
        test("should login user successfully", () => {
            const output = obj.login(userObj.username, userObj.password)
            expect(output).toBeTruthy()
        })

        test("should return false when username is incorrect", () => {
            const output = obj.login("incorrect userName", userObj.password)
            expect(output).toBeFalsy()
        })

        test("should return false when password is incorrect", () => {
            const output = obj.login(userObj.username, "incorrect password")
            expect(output).toBeFalsy()
        })

        test("should return false when username and password is incorrect", () => {
            const output = obj.login("incorrect userName", "incorrect password")
            expect(output).toBeFalsy()
        })
    })

    describe(AuthService.prototype.register.name, () => {
        test("should register user successfully", () => {
            const user = {
                username: "Ajoooooooy",
                password: "A@11111"
            }
            obj.register(user.username, user.password)
            const newUser = obj.getUserByUsername(user.username)
            expect(newUser).toEqual(user)
        })

        test("should throw duplicate user error", () => {
            try {
                obj.register(userObj.username, userObj.password)

            } catch (error) {
                expect(error).toBeInstanceOf(Error)
                expect(error).toEqual(new Error("duplicate user name"))
            }

        })
    })

})