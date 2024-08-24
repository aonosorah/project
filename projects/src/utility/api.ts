import { IUser } from '../models/user';

export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error('User not found');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('User not found:', error);
    throw error;
  }
};
