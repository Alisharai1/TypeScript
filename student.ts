type Student = { name: string, grades: number[] }

interface IStudent {
    getAverageGrade(): number
}

class StudentService implements IStudent {
    private readonly student: Student
    constructor(student: Student) {
        this.student = student
    }

    getAverageGrade(): number {
        let sum = 0
        this.student.grades.forEach((ele) => {
            sum += ele
        })
        return sum / this.student.grades.length
    }
}

const studentService = new StudentService({ name: "Ajay", grades: [4, 5, 6, 8, 9] })
const avgMarks = studentService.getAverageGrade()
console.log(avgMarks);

/**
 * getAvg():number{
 * let sum=0
 * this.student.grades.forEach((ele)=>{
 * sum+=ele
 * sum/this.student.grades.lengthw
 * })
 * }
 */
