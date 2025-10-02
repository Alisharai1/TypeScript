type ToDo = { id: number, title: string, completed: boolean }

interface IToDo {
    addTodo(title: string): ToDo

    removeTodo(id: number): void

    markComplete(id: number): boolean

    listTodos(page: number): ToDo[]
}

class ToDoManager implements IToDo {
    private toDos: ToDo[]
    constructor() {
        this.toDos = []
    }


    addTodo(title: string): ToDo {
        const toDoObj: ToDo = {
            id: this.toDos.length + 1,
            title,
            completed: false
        }
        this.toDos.push(toDoObj)
        return toDoObj

    }
    removeTodo(id: number): void {
        this.toDos = this.toDos.filter(({ id: toDoId }) => id !== toDoId)
    }
    markComplete(id: number): boolean {
        const toDo = this.toDos.find(({ id: toDoId }) => id === toDoId)
        if (toDo) {
            toDo.completed = true
            return true
        }
        return false
    }

    listTodos(page: number): ToDo[] {
        const start = 5 * (page - 1)
        const end = start + 5

        return this.toDos.slice(start, end)
    }

}