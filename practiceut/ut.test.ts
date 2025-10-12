import sum from "./ut";
describe(sum.name, () => {

   test("should add correctly", () => {
      const output = sum(5, 10)
      expect(output).toBe(15)
   })

   test("should return 0 if a is zero", () => {
      const output = sum(0, 10)
      expect(output).toBe(0)
   })

   test("should return -1 if b is zero", () => {
      const output = sum(8, 0)
      expect(output).toBe(-1)
   })
})