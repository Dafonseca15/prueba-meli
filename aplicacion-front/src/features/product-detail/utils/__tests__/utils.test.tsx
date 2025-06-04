import { calculateDiscount, discountPercentage } from '../utils';

describe('Feature: Discount Calculation and Percentage Formatting', () => {
  describe('Scenario: Calculate discount correctly', () => {
    it('Then: it should return null if original is null or undefined', () => {
      expect(calculateDiscount(null as any, 50)).toBeNull();
      expect(calculateDiscount(undefined as any, 50)).toBeNull();
    });

    it('And: it should return null if original is 0', () => {
      expect(calculateDiscount(0, 50)).toBeNull();
    });

    it('And: it should return null if original is less than or equal to current', () => {
      expect(calculateDiscount(100, 100)).toBeNull();
      expect(calculateDiscount(90, 100)).toBeNull();
    });

    it('And: it should return the rounded discount percentage if original is greater than current', () => {
      expect(calculateDiscount(100, 80)).toBe(20);
      expect(calculateDiscount(200, 100)).toBe(50);
      expect(calculateDiscount(150, 100)).toBe(33);
      expect(calculateDiscount(100, 99)).toBe(1);
      expect(calculateDiscount(100, 1)).toBe(99);
    });

    it('And: it should handle floating point numbers correctly for rounding', () => {
      expect(calculateDiscount(100, 66.66)).toBe(33);
      expect(calculateDiscount(100, 66.67)).toBe(33);
      expect(calculateDiscount(100, 66.5)).toBe(34);
    });
  });

  describe('Scenario: Format discount percentage', () => {
    it('Then: it should return an empty string if there is no discount (calculateDiscount returns null)', () => {
      expect(discountPercentage(100, 100)).toBe('');
      expect(discountPercentage(50, 60)).toBe('');
      expect(discountPercentage(0, 10)).toBe('');
    });

    it("And: it should return the discount percentage with '%' if there is a discount", () => {
      expect(discountPercentage(100, 80)).toBe('20%');
      expect(discountPercentage(200, 100)).toBe('50%');
      expect(discountPercentage(150, 100)).toBe('33%');
      expect(discountPercentage(100, 99)).toBe('1%');
    });
  });
});
