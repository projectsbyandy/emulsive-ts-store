import { promises as fs } from 'fs'
import path from 'path';

export const readFile = async (paths: string[]) : Promise<string> => {  
  const filePath = path.join(process.cwd(), ...paths);
  
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (err) {
    console.log('There was a problem reading the file')
    throw err;
  }
}