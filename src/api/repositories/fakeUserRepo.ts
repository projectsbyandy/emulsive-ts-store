import { type User } from '../types'
import { readFile } from '../helpers/fileReader';

const PATHS_TO_FAKE_DATA = ['..', 'fakedata', 'users.json'];

let users: User[];

export const getUsers = async () : Promise<User[]> => await readUsers();

export const getUserByEmail = async (email: string) : Promise<User | null> => {
  users = await readUsers();
  return users.find(user => user.email === email) ?? null;
}

export const getUserById = async (id: string) : Promise<User | null> => {
  users = await readUsers();
  return users.find(user => user.userId === id) ?? null;
}

export const createUser = (user: User) => {
  users.push(user);
}

export const deleteUserById = async (id: string) => {
  users = await readUsers();
  return users.filter(user => user.userId !== id);
}

async function readUsers() : Promise<User[]> {
  if (users && users.length > 0)
    return users;

  const rawData = await readFile(PATHS_TO_FAKE_DATA)
  users = JSON.parse(rawData);

  return users;
} 
