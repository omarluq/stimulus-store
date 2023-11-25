/**
 * A mapping from type names to their corresponding constructors.
 * @type {Record<string, new (...args: unknown[]) => unknown>}
 */
export const typeMap: Record<string, new (...args: unknown[]) => unknown> = {
  String: String,
  Number: Number,
  Array: Array,
  Object: Object,
  Boolean: Boolean
}
