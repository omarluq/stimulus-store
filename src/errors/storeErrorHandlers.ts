/**
 * Checks if the value is of the specified type.
 * @param {unknown} value - The value to check.
 * @param {new (...args: unknown[]) => unknown} type - The type constructor for the expected type.
 * @throws {Error} If the value is not of the expected type.
 */
export function checkValue(
  value: unknown,
  type: new (...args: unknown[]) => unknown,
): void {
  if (Object.getPrototypeOf(value).constructor !== type) {
    throw new Error(`Value '${value}' must be of type ${type.name}`)
  }
}

/**
 * Handles errors that occur when a promise fails to resolve.
 * @param {unknown} error - The error that occurred.
 * @throws {Error} A new error with a message indicating that the promise failed to resolve.
 */
export function handlePromiseError(error: unknown): never {
  throw new Error(`Failed to resolve promise:\n${error}`)
}
