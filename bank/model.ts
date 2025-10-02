
export type Account = { id: string, user:User, balance: number, history: number[] }

export type User = { name: string, age: number, email: string }

const account:Account={
    id: "",
    user: {
        name: "",
        age: 0,
        email: ""
    },
    balance: 0,
    history: []
}