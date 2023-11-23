export function camelize(str: string, firstCharUppercase = false) {
  const result = str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
    index === 0 && !firstCharUppercase ? word.toLowerCase() : word.toUpperCase()
  ).replace(/\s+/g, '');
  return result;
}
