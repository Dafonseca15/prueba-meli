import { fetchProductDetails } from '../productApi'; 
import mockProductData from '../../../../data/mockProductData.json';

describe('fetchProductDetails Function (BDD Style)', () => {
    // Usamos temporizadores falsos de Jest para controlar setTimeout
    beforeEach(() => {
        jest.useFakeTimers();
    });

    // Restauramos los temporizadores reales después de cada test
    afterEach(() => {
        jest.runOnlyPendingTimers(); // Asegura que cualquier temporizador pendiente se ejecute
        jest.useRealTimers();
    });

    // Given: La función fetchProductDetails
    describe('Given the fetchProductDetails function', () => {

        // When: Es llamada con un ID de producto que coincide
        test('When called with a matching productId, then it should resolve with the product data', async () => {
            const matchingId = mockProductData.id;
            
            const promise = fetchProductDetails(matchingId);

            // Avanza los temporizadores de Jest para que setTimeout se ejecute
            jest.runAllTimers();

            // Espera que la promesa se resuelva con los datos esperados
            await expect(promise).resolves.toEqual(mockProductData);
        });

        // When: Es llamada con un ID de producto que no coincide
        test('When called with a non-matching productId, then it should reject with "Producto no encontrado."', async () => {
            const nonMatchingId = 'nonExistentId'; // Un ID que sabes que no existe en tu mockData
            const promise = fetchProductDetails(nonMatchingId);

            // Avanza los temporizadores de Jest
            jest.runAllTimers();

            // Espera que la promesa se rechace con el error esperado
            await expect(promise).rejects.toThrow('Producto no encontrado.');
        });

        // Test para verificar que el retardo de 500ms ocurre
        test('Then it should simulate a 500ms delay before resolving or rejecting', async () => {
            const matchingId = mockProductData.id; // O un nonMatchingId, el retardo debe ocurrir igual
            const promise = fetchProductDetails(matchingId);

            const resolveSpy = jest.fn();
            const rejectSpy = jest.fn();
            promise.then(resolveSpy).catch(rejectSpy);

            // Avanza los temporizadores solo 499ms
            jest.advanceTimersByTime(499);

            // La promesa aún no debería haberse resuelto ni rechazado
            expect(resolveSpy).not.toHaveBeenCalled();
            expect(rejectSpy).not.toHaveBeenCalled();

            // Avanza los temporizadores el tiempo restante (1ms) para alcanzar los 500ms
            jest.advanceTimersByTime(1);

            await promise; 
            expect(resolveSpy).toHaveBeenCalledWith(mockProductData);
        });
    });
});