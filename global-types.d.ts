declare type UpdateMethod = (value: any) => void
declare type UnsubscribeFunction = () => void
declare type SetCallback = (value: any) => any
declare type SetOptions = {
  filter: (value: any) => boolean
}
declare type NotifySubscriberOptions = SetOptions
declare type CurrentValueCallback = (currentValue: T) => T
interface Subscription {
  subscribe: (callback: UpdateMethod) => UnsubscribeFunction;
}
