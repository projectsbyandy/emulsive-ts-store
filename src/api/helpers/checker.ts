export const isWholeWordPresent = (word: string, stringToCheck: string) : boolean => {
  const regex = new RegExp(`\\b${word}\\b`, 'i'); 
  
  return regex.test(stringToCheck);
}