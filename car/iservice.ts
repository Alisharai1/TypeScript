import { Car } from "./model";

export interface ICar {
    getCarInfo(car: Car): string
}