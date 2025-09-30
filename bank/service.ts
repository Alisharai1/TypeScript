import { IBankService } from "./iservice";
import { User, Account } from "./model";
import { v4 } from 'uuid'

class BankService implements IBankService {
    private accounts: Account[]
    constructor() {
        this.accounts = []
    }
    checkBalance(id: string): number {

        const { balance } = this.getAccountById(id)

        return balance
    }

    addAccount(user: User): Account {
        const account: Account = {
            id: v4(),
            user,
            balance: 10000,
            history: []
        }
        this.accounts.push(account)
        return account
    }
    getAccountById(accountId: string): Account {
        //const account= this.accounts.find((acc)=>{
        //if(accountId===acc.accountId)
        // })
        //this.accounts.find(({id})=>)
        console.log(accountId);

        const account = this.accounts.find(({ id }) => id == accountId)
        if (!account) {
            throw new Error("account not found")
        }
        return account

    }

    deleteAccountById(id: string): void {
        this.getAccountById(id)
        this.accounts = this.accounts.filter(({ id: accId }) => id !== accId)
    }
    transferAmount(acc1: string, acc2: string, amount: number): void {
        const a = this.getAccountById(acc1)
        const b = this.getAccountById(acc2)

        if (a.balance < amount) {
            throw new Error('Insufficent balence')
        }

        a.balance -= amount
        a.history.push(-amount)
        b.balance += amount
        b.history.push(amount)
    }
    getTransactionHistory(id: string): number[] {
        const account = this.getAccountById(id)
        return account.history
    }
}

const obj: IBankService = new BankService()
const account = obj.addAccount({ name: "Alisha", age: 28, email: "a@g.com" })
const account1 = obj.addAccount({ name: "Ajay", age: 38, email: "ajay@g.com" })
obj.transferAmount(account.id, account1.id, 2000)
console.log(account, account1);
const transactionHistory = obj.getTransactionHistory(account.id)
console.log(transactionHistory);
