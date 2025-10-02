// function greet1(name1: string, name2: string, name3: string, name4: string, name5: string, name6: string): string {

//     const output1 = greet2(name5, name4, name3, name2, name1)
//     console.log(output1);
//     return output1
// }

// const obj = { name: "ALisha", age: 29 }

// function greet2(name1: string, name2: string, name3: string, name4: string, name5: string): string {

//     const output2 = greet3(name1, name2, name3, name4)
//     console.log(output2);
//     return output2
// }

// function greet3(name1: string, name2: string, name3: string, name4: string): string {
//     console.log(name1, name2, name3, name4);

//     return "this is greet3 function"


// }

// function greet4(name1: string, name2: string, name3: string): string {


// }

// function greet5(name1: string, name2: string): string {


// }

// function greet6(name1: string,): string {


// }

// const output = greet1("A", "B", 'C', 'D', 'E', 'F')
// console.log(output);


// enum UserRole {
//     ADMIN = "ADMIN",
//     MANAGER = "MANAGER",
//     DEVELOPER = "DEVELOPER",
//     INTERN = "INTERN"
// }

// // Address object
// type Address = {
//     street: string;
//     city: string;
//     country: string;
//     postalCode?: string; // optional
// };

// // Contact details
// type Contact = {
//     email: string;
//     phone: string;
//     isPrimary?: boolean;
// };

// // Project details
// type Project = {
//     id: string;
//     name: string;
//     techStack: string[];
//     deadline: Date | null;
//     status: "active" | "completed" | "on-hold"; // union type
// };

// // Main User type
// type User = {
//     id: number;
//     name: string;
//     role: UserRole;
//     isActive: boolean;
//     address: Address;
//     contacts: Contact[];
//     projects: Project[];
//     skills: string[] | null; // can be null
//     meta: {
//         hobbies: string[];
//         yearsOfExperience: number;
//         certifications: string[];
//     };
// };

// const user: User = { id: 101, name: "Alisha", role: UserRole.ADMIN, isActive: true, address: { street: "NT", city: "KOlkata", country: "INdia", postalCode: "700156" }, contacts: [{ email: "a@g.com", phone: "0000" }], projects: [{ id: "a11", name: "JS", techStack: ["JSS", "qaw"], deadline: new Date("2025-10-01"), status: "active" }], skills: ['.Net', 'Java'], meta: { hobbies: ['playing', 'reading'], yearsOfExperience: 4, certifications: ['Y', 'J'] } }

enum UserRole {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    DEVELOPER = "DEVELOPER",
    INTERN = "INTERN"
}

// Address class
class Address {
    constructor(
        public street: string,
        public city: string,
        public country: string,
        public postalCode?: string // optional
    ) { }
}

// Contact class
class Contact {
    constructor(
        public email: string,
        public phone: string,
        public isPrimary: boolean = false
    ) { }
}

// Project class
class Project {
    constructor(
        public id: string,
        public name: string,
        public techStack: string[],
        public deadline: Date | null,
        public status: "active" | "completed" | "on-hold"
    ) { }
}

// Main User class
class User {
    constructor(
        public id: number,
        public name: string,
        public role: UserRole,
        public isActive: boolean,
        public address: Address,
        public contacts: Contact[],
        public projects: Project[],
        public skills: string[] | null,
        public meta?: {
            hobbies: string[];
            yearsOfExperience: number;
            certifications?: string[];
        }
    ) { }

    // Method to add a new project
    addProject(project: Project) {
        this.projects.push(project);
    }

    // Method to deactivate user
    deactivate() {
        this.isActive = false;
    }
}


const user = new User(1, "ALisha", UserRole.DEVELOPER, true, new Address("NT", "Kolkata", "India"), [new Contact("a@g.com", "12345")], [new Project("101", "Learning TS", ["TS", "JS"], new Date("2025-10-02"), "active")], ["Python", "JS"], { hobbies: [], yearsOfExperience: 4, certifications: [] })

user.addProject(new Project("101", "Learning TS", ["TS", "JS"], new Date("2025-10-02"), "active"))

user.deactivate()