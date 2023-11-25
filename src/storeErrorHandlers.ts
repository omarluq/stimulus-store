export function checkValue(value: unknown, type: new (...args: unknown[]) => unknown): void {
  if (Object.getPrototypeOf(value).constructor !== type) {
    throw new Error(`Value '${value}' must be of type ${type.name}`);
  }
}

export function handlePromiseError(error: unknown): never {
  throw new Error('Failed to resolve promise:\n' + error);
}