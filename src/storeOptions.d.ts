import { TypeKey } from './storeValuesTypeMap';

export interface StoreOptions<T> {
  name: string;
  type: TypeKey;
  initialValue: T;
}