import { User } from "./user"

export default interface IUserService {
    addUser(user: User) : void
    getUserByEmail(email: string): User
    getUsers(page: number): User[]
    deleteUser(email: string): void
}
