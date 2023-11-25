/**
 * Checks if the stores array is defined and not empty.
 * @param {unknown} stores - The stores array to check.
 * @throws {Error} If the stores array is undefined or empty.
 */
export function checkStores(stores: unknown): void {
  if (!stores || (Array.isArray(stores) && stores.length === 0)) {
    throw new Error(`Error: 'useStore' was called on a controller without a 'stores' static property.`)
  }
}
