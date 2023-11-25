/**
 * A mapping from type names to their corresponding constructors.
 * - Allows type checking values in runtime.
 * - Allows the use of the following types: String, Number, Array, Object, Boolean.
 * @type {Record<string, new (...args: unknown[]) => unknown>}
 *
 */
export const typeMap: Record<string, new (...args: unknown[]) => unknown> = {
  String: String,
  Number: Number,
  Array: Array,
  Object: Object,
  Boolean: Boolean
}
