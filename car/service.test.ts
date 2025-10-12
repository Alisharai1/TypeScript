import { Car } from "./model";
import { CarService } from "./service";

describe(CarService.name, () => {
    const carService = new CarService()

    test("check instance", () => {
        expect(carService).toBeInstanceOf(CarService)
    })
    describe(CarService.prototype.getCarInfo.name, () => {
        test("should return car info", () => {

            const car: Car = {
                model: "T2025",
                brand: "Nexon",
                year: new Date("2025-10-09")
            }
            const output = carService.getCarInfo(car)

            expect(output).toBe(`Nexon Model T2025 2025`)
        })
    })
})
