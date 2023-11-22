/**
 * useStore Function
 *
 * The useStore function simplifies the process of subscribing to and handling updates from multiple store instances
 * within a Stimulus controller.
 *
 * @param {Object} controller - The Stimulus controller instance that wants to subscribe to the stores.
 * @param {Array<Store<T>>} stores - An array of store instances that the controller wants to subscribe to.
 * @template T - The type of data stored in the stores.
 *
 * How It Works:
 * 1. Iterates over the stores.
 * 2. Identifies the type of each store and constructs an update method name.
 * 3. Creates update methods for stores if corresponding onStoreUpdate methods exist on the controller.
 * 4. Dynamically assigns update methods to the controller with specific names based on store types.
 * 5. Subscribes update methods to stores to handle updates.
 * 6. Enhances the controller's disconnect method to include cleanup for all subscriptions.
 *
 * Usage Example:
 * ```javascript
 * import { Controller } from "stimulus";
 * import { useStore } from "stimulus-store";
 * import { myStore } from "./stores/myStore"; // Import your store class
 *
 * export default class extends Controller {
 *   connect() {
 *     // Use the useStore function to subscribe to specific stores
 *     useStore(this, [myStore]);
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

export function useStore<T>(controller: any, stores: Store<T>[]) {
  const unsubscribeFunctions: UnsubscribeFunction[] = [];
  
  stores.forEach((store) => {
    const storeName = store.name;
    const onStoreUpdateMethodName = `on${storeName}Update`;
    const onStoreUpdateMethod: UpdateMethod = controller[onStoreUpdateMethodName];

    if (onStoreUpdateMethod) {
      // Create a specific update method for this store
      const updateMethod: UpdateMethod = value => {
        onStoreUpdateMethod.call(controller, value);
      };

      // Set the update method on the controller with a specific name based on the store type
      const methodName = `update${storeName}`;
      controller[methodName] = updateMethod;

      // Subscribe to the store using the specific update method
      unsubscribeFunctions.push(store.subscribe(updateMethod));
    }
  });

  // Enhance the controller's disconnect method to include cleanup for all subscriptions
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
