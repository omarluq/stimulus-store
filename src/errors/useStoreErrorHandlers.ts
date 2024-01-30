/**
 * Checks if the stores array is defined, not empty, and is an array.
 * @param {unknown} stores - The stores array to check.
 * @throws {Error} If the stores array is undefined, empty, or not an array.
 */
export function checkStores(stores: unknown): void {
  if (!stores) {
    throw new Error(
      `'useStore' was called on a controller without a 'stores' static property. The 'stores' property is undefined.`,
    )
  }

  if (!Array.isArray(stores)) {
    throw new Error(
      `'useStore' was called on a controller with a 'stores' static property that is not an array.`,
    )
  }

  if (stores.length === 0) {
    throw new Error(
      `'useStore' was called on a controller with an empty 'stores' static property. The 'stores' array should contain at least one store.`,
    )
  }
}
