export function paginateSplit<T>(array: T[], pageSize: number, pageNumber: number): T[] 
{ 
  const startIndex = (pageNumber - 1) * pageSize; 
  return array.slice(startIndex, startIndex + pageSize); 
}