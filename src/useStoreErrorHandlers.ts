export function checkStores(stores: unknown): void {
  if (!stores || (Array.isArray(stores) && stores.length === 0)) {
    throw new Error(`Error: 'useStore' was called on a controller without a 'stores' static property.`);
  }
}