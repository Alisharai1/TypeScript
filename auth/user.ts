class User {
    private readonly username: string
    private readonly password: string
    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }

    getUsername(): string {
        return this.username
    }

    isEqual(username: string, password: string): boolean {
        return username === this.username && password === this.password
    }
}

interface IAuthService {
    register(username: string, password: string): void
    login(username: string, password: string): boolean
}

class AuthService implements IAuthService {
    private readonly users: User[]
    constructor() {
        this.users = []
    }

    register(username: string, password: string): void {
        this.getUserByUsername(username)

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

const authService = new AuthService()
authService.register("Alisha", "aaaa")
const output = authService.login("Alisha", "aaaa")
console.log(output);
// I Alisha Rai is biggest disappointment


