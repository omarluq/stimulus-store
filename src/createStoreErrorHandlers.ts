import { typeMap } from './storeValuesTypeMap';


export function checkInitialValue<T>(initialValue: T): void {
  if (typeof initialValue === "undefined") {
    throw new Error("Store must be initialized with a value");
  }
}

export function checkName(name: string): void {
  if (typeof name !== "string") {
    throw new Error("Store name must be of Type string");
  }
}

export function checkTypeConstructor(type: string): void {
  const typeConstructor = typeMap[type];
  if (typeof typeConstructor !== 'function') {
    throw new Error(`Invalid type: ${type}`);
  }
  
}

export function handleStoreSetError(error: unknown): never {
  if (error instanceof Error) {
    throw new Error(`Failed to create store: ${error.message}`);
  } else {
    throw new Error('An unknown error occurred while creating the store');
  }
}