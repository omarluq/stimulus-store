export function camelize(str: string, firstCharUppercase: boolean = false): string {
  const pattern1: RegExp = /(?:^\w|[A-Z]|\b\w)/g;
  const pattern2: RegExp = /\s+/g;
  const result: string = str.replace(pattern1, (word, index) => 
    index === 0 && !firstCharUppercase ? word.toLowerCase() : word.toUpperCase()
  ).replace(pattern2, '');
  return result;
}
