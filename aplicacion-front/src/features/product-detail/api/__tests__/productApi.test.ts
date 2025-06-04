import { fetchProductDetails } from '../productApi';
import mockProductData from '../../../../data/mockProductData.json';

describe('fetchProductDetails Function (BDD Style)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Given the fetchProductDetails function', () => {
    test('When called with a matching productId, then it should resolve with the product data', async () => {
      const matchingId = mockProductData.id;

      const promise = fetchProductDetails(matchingId);

      jest.runAllTimers();

      await expect(promise).resolves.toEqual(mockProductData);
    });

    test('When called with a non-matching productId, then it should reject with "Producto no encontrado."', async () => {
      const nonMatchingId = 'nonExistentId';
      const promise = fetchProductDetails(nonMatchingId);

      jest.runAllTimers();

      await expect(promise).rejects.toThrow('Producto no encontrado.');
    });

    test('Then it should simulate a 500ms delay before resolving or rejecting', async () => {
      const matchingId = mockProductData.id;
      const promise = fetchProductDetails(matchingId);

      const resolveSpy = jest.fn();
      const rejectSpy = jest.fn();
      promise.then(resolveSpy).catch(rejectSpy);

      jest.advanceTimersByTime(499);

      expect(resolveSpy).not.toHaveBeenCalled();
      expect(rejectSpy).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);

      await promise;
      expect(resolveSpy).toHaveBeenCalledWith(mockProductData);
    });
  });
});
