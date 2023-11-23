import type { Controller } from "@hotwired/stimulus"
import type { Store } from './store';

export interface StoreController extends Controller {
  [key: string]: any;
  constructor: {
    stores?: Store<any>[];
  };
}