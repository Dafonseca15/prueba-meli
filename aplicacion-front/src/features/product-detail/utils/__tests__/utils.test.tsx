import { calculateDiscount, discountPercentage } from '../utils'; // Ruta a tu archivo utils

// Feature: Discount Calculation and Percentage Formatting
describe("Feature: Discount Calculation and Percentage Formatting", () => {

  // Scenario: Calculate discount correctly
  describe("Scenario: Calculate discount correctly", () => {
    // Given: Various original and current price values

    it("Then: it should return null if original is null or undefined", () => {
      // When: calculateDiscount is called with null/undefined original
      expect(calculateDiscount(null as any, 50)).toBeNull();
      expect(calculateDiscount(undefined as any, 50)).toBeNull();
    });

    it("And: it should return null if original is 0", () => {
      // When: calculateDiscount is called with original as 0
      expect(calculateDiscount(0, 50)).toBeNull();
    });

    it("And: it should return null if original is less than or equal to current", () => {
      // When: calculateDiscount is called with original <= current
      expect(calculateDiscount(100, 100)).toBeNull(); // Equal
      expect(calculateDiscount(90, 100)).toBeNull();  // Less than
    });

    it("And: it should return the rounded discount percentage if original is greater than current", () => {
      // When: calculateDiscount is called with original > current
      expect(calculateDiscount(100, 80)).toBe(20); // 20%
      expect(calculateDiscount(200, 100)).toBe(50); // 50%
      expect(calculateDiscount(150, 100)).toBe(33); // 33.33 -> 33% (rounded)
      expect(calculateDiscount(100, 99)).toBe(1);   // 1%
      expect(calculateDiscount(100, 1)).toBe(99);   // 99%
    });

    it("And: it should handle floating point numbers correctly for rounding", () => {
      // When: calculateDiscount is called with floating point numbers
      expect(calculateDiscount(100, 66.66)).toBe(33); // 33.34 -> 33%
      expect(calculateDiscount(100, 66.67)).toBe(33); // 33.33 -> 33%
      expect(calculateDiscount(100, 66.5)).toBe(34);   // 33.5 -> 34%
    });
  });

  // Scenario: Format discount percentage
  describe("Scenario: Format discount percentage", () => {
    // Given: Various original and current price values

    it("Then: it should return an empty string if there is no discount (calculateDiscount returns null)", () => {
      // When: discountPercentage is called with no actual discount
      expect(discountPercentage(100, 100)).toBe('');
      expect(discountPercentage(50, 60)).toBe('');
      expect(discountPercentage(0, 10)).toBe('');
    });

    it("And: it should return the discount percentage with '%' if there is a discount", () => {
      // When: discountPercentage is called with an actual discount
      expect(discountPercentage(100, 80)).toBe('20%');
      expect(discountPercentage(200, 100)).toBe('50%');
      expect(discountPercentage(150, 100)).toBe('33%');
      expect(discountPercentage(100, 99)).toBe('1%');
    });
  });
});