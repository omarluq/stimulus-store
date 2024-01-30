import { UnsubscribeFunction } from './unsubscribeFunction'
import { UpdateMethod } from './updateMethod'

export interface Subscription {
  subscribe: (callback: UpdateMethod) => UnsubscribeFunction
}
