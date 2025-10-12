import { User } from "./user"
interface IAuthService {
    register(username: string, password: string): void
    login(username: string, password: string): boolean
}

export class AuthService implements IAuthService {
    private readonly users: User[]
    constructor() {
        this.users = []
    }

    register(username: string, password: string): void {
        const user = this.getUserByUsername(username)
        if (user) {
            throw new Error("duplicate user name")
        }
        const newUser = new User(username, password)
        this.users.push(newUser)
    }
    getUserByUsername(username: string): User | undefined {
        const user = this.users.find((u) => {
            if (username !== u.getUsername()) {
                return false
            }
            return true
        })
        return user

    }
    login(username: string, password: string): boolean {
        const user = this.users.find((u) => {
            if (u.isEqual(username, password)) {
                return true
            }
            return false
        })
        return !!user

    }
}