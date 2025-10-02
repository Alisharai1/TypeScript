import { User } from "./user";
import IUserService from "./user-service.interface";

class UserService implements IUserService {
    private users: User[]

    constructor() {
        this.users = []
    }
    deleteUser(email: string): void {
        this.getUserByEmail(email)
        this.users = this.users.filter((u) => {
            if (email === u.email) {
                return false
            }
            return true
        })
    }

    addUser(user: User) {
        this.users.push(user)
    }

    getUserByEmail(email: string): User {
        const user = this.users.find((u) => {
            if (u.email === email) {
                return true
            }
            return false
        })
        if (!user) {
            throw new Error("user not found")
        }
        return user
    }

    getUsers(page: number): User[] {
        const start = (page - 1) * 5
        const end = start + 5
        return this.users.slice(start, end)
    }
    //30 users
    // start-
    //limit=5- end
    //1->0-5,2->5-10,3->10-15,4->15-20...
}

const userService = new UserService()
const user1 = new User("Alisha", 34, "a@g.com")
const user2 = new User("Ajay", 54, "ajay@g.com")
userService.addUser(user1)
userService.addUser(user2)
console.log(user1);
console.log(user2);

const user3 = userService.getUserByEmail(user2.email)
console.log(user3);







