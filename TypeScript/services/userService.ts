import { insertDataIntoSheet, readSheet } from '../repositories/googleSheetsRepository';

interface UserData {
    name: string;
    email: string;
}

interface UserDB {
    username: string;
    email: string;
    role: string;
}

export const addUserToSheet = async (data: UserData): Promise<void> => {
    await insertDataIntoSheet(data);
};

export const getSheetData = async (): Promise<Array<Array<string>>> => {
    return await readSheet();
};

export const getUserData = async (username: string): Promise<UserDB | undefined> => {
    const usersDB: UserDB[] = [
        { username: 'admin', email: 'admin@example.com', role: 'admin' },
        { username: 'user', email: 'user@example.com', role: 'user' }
    ];

    return usersDB.find(user => user.username === username);
};

export default {
    addUserToSheet,
    getSheetData,
    getUserData
};
