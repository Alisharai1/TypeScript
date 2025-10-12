import { Person } from "./model";

export default interface IPerson{
    introduce(person:Person):string
}