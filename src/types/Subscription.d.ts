import type { UnsubscribeFunction } from './unsubscribeFunction'
import type { UpdateMethod } from './updateMethod'

export interface Subscription {
  subscribe: (callback: UpdateMethod) => UnsubscribeFunction
}
