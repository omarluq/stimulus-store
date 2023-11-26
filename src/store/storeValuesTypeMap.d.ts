type String = new (...args: unknown[]) => string
type Number = new (...args: unknown[]) => number
type Array = new (...args: unknown[]) => unknown[]
type Object = new (...args: unknown[]) => object
type Boolean = new (...args: unknown[]) => boolean
/* eslint-disable @typescript-eslint/ban-types */
export type TypeKey = String | Number | Array | Object | Boolean
/* eslint-enable @typescript-eslint/ban-types */
