import type { StoreController, StoreValue, Subscription } from 'types'
import { checkStores } from '../errors/useStoreErrorHandlers'
import { warnDirectAccess } from '../errors/useStoreWarningHandlers'
import type { Store } from '../store/store'
import { camelize, pascalize } from '../utils/formatter'
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
 * import { Controller } from "@hotwired/stimulus";
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
 *   onMyStoreUpdate() {
 *     // Handle updates for MyStore
 *     console.log("MyStore updated:", this.myStoreValue);
 *   }
 * }
 * ```
 * @param {Object} controller - The Stimulus controller instance that wants to subscribe to the stores.
 * @template T - The type of data stored in the stores.
 */

export function useStore(controller: StoreController) {
  const stores: Store[] | undefined = controller.constructor?.stores
  const unsubscribeFunctions: (() => void)[] = []

  // If 'stores' is undefined or empty, throw an error
  checkStores(stores)

  stores?.forEach((store) => {
    const storeName: symbol = store.name
    const storeNameAsString: string = storeName.toString().slice(7, -1)
    const camelizedName: string = camelize(storeNameAsString)
    const pascalizedName: string = pascalize(storeNameAsString)
    const onStoreUpdateMethodName: string = `on${pascalizedName}Update`
    const onStoreUpdateMethod = controller[onStoreUpdateMethodName] as (
      value: StoreValue,
    ) => void
    const subscription: Subscription = store.getSubscription()

    if (onStoreUpdateMethod) {
      const updateMethod: (value: StoreValue) => void = (value) => {
        onStoreUpdateMethod.call(controller, value)
      }

      const methodName = `update${pascalizedName}`
      controller[methodName] = updateMethod

      unsubscribeFunctions.push(subscription.subscribe(updateMethod))
    }

    // Add a helper method to set the store value
    const setStoreValueMethodName = `set${pascalizedName}Value`
    controller[setStoreValueMethodName] = (
      value:
        | StoreValue
        | Promise<StoreValue>
        | ((prev: StoreValue) => StoreValue),
    ) => {
      store.set(value)
    }

    // Add a helper method to reset the store value
    const resetStoreMethodName = `reset${pascalizedName}`
    controller[resetStoreMethodName] = () => {
      store.resetValue()
    }

    const storeGetterMethodName: string = `${camelizedName}Value`

    Object.defineProperty(controller, storeGetterMethodName, {
      get: () => store.get(),
      enumerable: true,
      configurable: true,
    })

    let isWarned = false

    // Wrap the store in a Proxy to intercept direct access
    const storeProxy = new Proxy(store, {
      get: (target, prop, receiver) => {
        isWarned = warnDirectAccess(camelizedName, isWarned)
        return Reflect.get(target, prop, receiver)
      },
    })

    Object.defineProperty(controller, camelizedName, {
      get: () => storeProxy,
      enumerable: true,
      configurable: true,
    })
  })

  const originalDisconnect = controller.disconnect.bind(controller)
  controller.disconnect = () => {
    unsubscribeFunctions.forEach((unsubscribe) => {
      if (unsubscribe) {
        unsubscribe()
      }
    })
    originalDisconnect()
  }
}
