interface IBankAccount {
    deposit(amount: number): number
    withdraw(amount: number): number
    getBalance(): number
}
enum AccountType {
    SAVING = "SAVING",
    CURRENT = "CURRENT",
}

class InsufficentBalanceError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}

class BankAccount implements IBankAccount {
    private balance: number
    private accountType: AccountType
    constructor(initialBalance: number, accountType: AccountType) {
        this.balance = initialBalance
        this.accountType = accountType
    }

    deposit(amount: number): number {
        this.balance += amount
        return this.balance
    }

    withdraw(amount: number): number {
        if (this.balance > amount) {
            this.balance -= amount
            console.log(this.accountType);

            return this.balance
        }
        throw new InsufficentBalanceError("Insufficient balance.")

    }

    getBalance(): number {
        return this.balance
    }
}

function main(): void {
    try {

        const obj = new BankAccount(2000, AccountType.CURRENT)
        let newAmount = obj.deposit(5000)
        console.log(newAmount);
        newAmount = obj.withdraw(4000)
        console.log(newAmount);
        newAmount = obj.withdraw(400000)
        console.log(newAmount);
    }
    catch (error) {
        if (error instanceof InsufficentBalanceError) {

            console.log(error, InsufficentBalanceError.name);
        }
    }
}

main()





