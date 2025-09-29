import { Account, User } from "./model";

export interface IBankService {

    addAccount(user: User): Account
    getAccountById(id: string): Account
    deleteAccountById(id: string): void
    transferAmount(fromId: string, toId: string, amount: number): void
    checkBalance(id: string): number
    getTransactionHistory(id:string):number[]

}