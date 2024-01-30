/**
 * Logs a warning message if the store is accessed directly and `isWarned` is false.
 * @param {string} camelizedName - The camelized name of the store.
 * @param {boolean} isWarned - A flag indicating if the warning has already been logged.
 * @returns {boolean} Returns true if the warning was logged, otherwise returns the original `isWarned` value.
 */
export function warnDirectAccess(
  camelizedName: string,
  isWarned: boolean,
): boolean {
  if (!isWarned) {
    console.warn(
      `Warning: You are accessing the '${camelizedName}' instance directly. Consider using 'on${
        camelizedName.charAt(0).toUpperCase() + camelizedName.slice(1)
      }Update' and '${camelizedName}Value' instead.`,
    )
    return true
  }
  return isWarned
}
