import type { TypeKey } from '../types/typeKey'

/**
 * A mapping from type names to their corresponding constructor types.
 * - Allows type checking values at runtime.
 * - Allows the use of the following types: String, Number, Array, Object, Boolean.
 * - Each type has its own constructor type: StringConstructor, NumberConstructor, ArrayConstructor, ObjectConstructor, BooleanConstructor.
 * - TypeKey is a union of all the constructor types.
 * @type {Record<string, TypeKey>}
 *
 */

export const typeMap: Record<string, TypeKey> = {
  String: String,
  Number: Number,
  Array: Array,
  Object: Object,
  Boolean: Boolean,
}
