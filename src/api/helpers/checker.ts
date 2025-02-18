export const isWholeWordPresent = (word: string, stringToCheck: string) : boolean => {
  const regex = new RegExp(`\\b${word}\\b`, 'i'); 
  
  return regex.test(stringToCheck);
}

export function areAllArrayItemsSame<T>(arr: T[]): boolean {
  if (arr.length === 0) return true;
  return arr.every(value => value === arr[0]);
}