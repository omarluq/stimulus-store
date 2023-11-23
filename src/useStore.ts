/**
 * useStore Function
 *
 * The useStore function simplifies the process of subscribing to and handling updates from multiple store instances
 * within a Stimulus controller. It also allows direct access to store values on the controller.
 *
 * @param {Object} controller - The Stimulus controller instance that wants to subscribe to the stores.
 * @template T - The type of data stored in the stores.
 *
 * How It Works:
 * 1. Retrieves the stores from the controller's constructor.
 * 2. Iterates over the stores.
 * 3. Identifies the type of each store and constructs an update method name.
 * 4. Creates update methods for stores if corresponding onStoreUpdate methods exist on the controller.
 * 5. Dynamically assigns update methods to the controller with specific names based on store types.
 * 6. Subscribes update methods to stores to handle updates.
 * 7. Allows direct access to store values on the controller.
 * 8. Enhances the controller's disconnect method to include cleanup for all subscriptions.
 *
 * Usage Example:
 * ```javascript
 * import { Controller } from "stimulus";
 * import { useStore } from "stimulus-store";
 * import { myStore } from "./stores/myStore"; // Import your store class
 *
 * export default class extends Controller {
 *  static stores = [myStore];
 *   connect() {
 *     // Use the useStore function to subscribe to specific stores
 *     useStore(this);
 *   }
 *
 *   // Implement specific update methods for each store
 *   onMyStoreUpdate(value) {
 *     // Handle updates for MyStore
 *     console.log("MyStore updated:", value);
 *   }
 * }
 * ```
 */
import type { Store } from './store';
import type { StoreController } from './storeController'; // Adjust the path as needed
import { camelize } from './utils/camelize';

export function useStore<T>(controller: StoreController<T>) {
  const stores: Store<T>[] = controller.constructor.stores || [];
  const unsubscribeFunctions: (() => void)[] = [];

  stores.forEach((store) => {
    const storeName: string = store.name;
    const camelizedName = camelize(storeName);
    const onStoreUpdateMethodName = `on${camelize(storeName, true)}Update`;
    const onStoreUpdateMethod = controller[onStoreUpdateMethodName] as (value: T) => void;

    if (onStoreUpdateMethod) {
      const updateMethod: (value: T) => void = value => {
        onStoreUpdateMethod.call(controller, value);
      };

      const methodName = `update${camelize(storeName, true)}`;
      controller[methodName] = updateMethod;

      unsubscribeFunctions.push(store.subscribe(updateMethod));
    }

    Object.defineProperty(controller, `${camelizedName}Value`, {
      get: () => store.get(),
      enumerable: true,
      configurable: true,
    });

    Object.defineProperty(controller, camelizedName, {
      get: () => store,
      enumerable: true,
      configurable: true,
    });
  });

  const originalDisconnect = controller.disconnect.bind(controller);
  controller.disconnect = () => {
    unsubscribeFunctions.forEach(unsubscribe => {
      if (unsubscribe) {
        unsubscribe();
      }
    });
    originalDisconnect();
  };
}