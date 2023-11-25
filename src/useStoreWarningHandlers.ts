export function warnDirectAccess(camelizedName: string, isWarned: boolean): boolean {
  if (!isWarned) {
    console.warn(`Warning: You are accessing the '${camelizedName}' instance directly. Consider using 'on${camelizedName.charAt(0).toUpperCase() + camelizedName.slice(1)}Update' and '${camelizedName}Value' instead.`);
    return true;
  }
  return isWarned;
}