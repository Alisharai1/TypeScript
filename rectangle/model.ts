type Rectangle = { width: number, height: number }

interface IRectangle {
    getArea(): number
    getPerimeter(): number
}

class RectangleService implements IRectangle {
    private readonly rectangle: Rectangle
    constructor(rectangle: Rectangle) {
        this.rectangle = rectangle

    }
    getArea(): number {
        return this.rectangle.width * this.rectangle.height
    }
    getPerimeter = (): number => 2 * (this.rectangle.height + this.rectangle.width)
}

const obj = new RectangleService({ width: 20, height: 30 })
const area = obj.getArea()
console.log(area);
const perimeter = obj.getPerimeter()
console.log(perimeter);

