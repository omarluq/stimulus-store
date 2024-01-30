type String = new (...args: unknown[]) => string
type Number = new (...args: unknown[]) => number
type Array = new (...args: unknown[]) => unknown[]
type Object = new (...args: unknown[]) => object
type Boolean = new (...args: unknown[]) => boolean
export type TypeKey = String | Number | Array | Object | Boolean
