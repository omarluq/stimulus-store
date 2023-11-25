import type { Store } from '../store/store'
import type { StoreController } from '../store/storeController' // Adjust the path as needed
import { camelize } from '../utils/camelize'
import { checkStores } from '../errors/useStoreErrorHandlers'
import { warnDirectAccess } from '../errors/useStoreWarningHandlers'

/**
 * useStore Function
 * The useStore function simplifies the process of subscribing to and handling updates from multiple store instances
 * within a Stimulus controller. It also allows direct access to store values on the controller.
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
 *
 *   connect() {
 *     // Use the useStore function to subscribe to specific stores
 *     useStore(this);
 *   }
 *
 *   // Implement specific update methods for each store
 *   onMyStoreUpdate {
 *     // Handle updates for MyStore
 *     console.log("MyStore updated:", this.myStoreValue);
 *   }
 * }
 * ```
 * @param {Object} controller - The Stimulus controller instance that wants to subscribe to the stores.
 * @template T - The type of data stored in the stores.
 */

export function useStore<T>(controller: StoreController<T>) {
  const stores: Store<T>[] = controller.constructor.stores || []
  const unsubscribeFunctions: (() => void)[] = []

  // If 'stores' is undefined or empty, throw an error
  checkStores(stores)

  stores.forEach(store => {
    const storeName: symbol = store.name
    const storeNameAsString: string = storeName.toString().slice(7, -1)
    const camelizedName = camelize(storeNameAsString)
    const onStoreUpdateMethodName = `on${camelize(storeNameAsString, true)}Update`
    const onStoreUpdateMethod = controller[onStoreUpdateMethodName] as (value: T) => void

    if (onStoreUpdateMethod) {
      const updateMethod: (value: T) => void = value => {
        onStoreUpdateMethod.call(controller, value)
      }

      const methodName = `update${camelize(storeNameAsString, true)}`
      controller[methodName] = updateMethod

      unsubscribeFunctions.push(store.subscribe(updateMethod))
    }

    // Add a helper method to set the store value
    const setStoreValueMethodName = `set${camelize(storeNameAsString, true)}Value`
    controller[setStoreValueMethodName] = (value: T | Promise<T> | ((prev: T) => T)) => {
      store.set(value)
    }

    const storeGetterMethodName: string = `${camelizedName}Value`

    Object.defineProperty(controller, storeGetterMethodName, {
      get: () => store.get(),
      enumerable: true,
      configurable: true
    })

    let isWarned: boolean = false

    // Wrap the store in a Proxy to intercept direct access
    const storeProxy = new Proxy(store, {
      get: function (target, prop, receiver) {
        isWarned = warnDirectAccess(camelizedName, isWarned)
        return Reflect.get(target, prop, receiver)
      }
    })

    // Overwrite the value of the store in the static object to the safe proxy
    const storeIndex = stores.indexOf(store)
    stores[storeIndex] = storeProxy

    Object.defineProperty(controller, camelizedName, {
      get: () => storeProxy,
      enumerable: true,
      configurable: true
    })
  })

  const originalDisconnect = controller.disconnect.bind(controller)
  controller.disconnect = () => {
    unsubscribeFunctions.forEach(unsubscribe => {
      if (unsubscribe) {
        unsubscribe()
      }
    })
    originalDisconnect()
  }
}
