import { ICar } from "./iservice";
import { Car } from "./model";

export class CarService implements ICar {
    getCarInfo(car: Car): string {
        return `${car.brand} Model ${car.model} ${car.year.getFullYear()}`
    }
}

const obj = new CarService()
const output = obj.getCarInfo({ brand: "Tesla", model: "S", year: new Date("2025-09-29") })
