import type { Controller } from "@hotwired/stimulus"
import type { Store } from './store';

export interface StoreController<T> extends Controller {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  constructor: {
    stores?: Store<T>[];
  };
}