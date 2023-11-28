import { UpdateMethod } from './updateMethod'
import { UnsubscribeFunction } from './unsubscribeFunction'

export interface Subscription {
  subscribe: (callback: UpdateMethod) => UnsubscribeFunction
}
