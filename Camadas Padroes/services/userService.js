const googleSheetsRepository = require('../repositories/googleSheetsRepository');

exports.addUserToSheet = async (data) => {
    await googleSheetsRepository.insertDataIntoSheet(data);
};

exports.getSheetData = async () => {
    const rows = await googleSheetsRepository.readSheet();
    return rows;
};

exports.getUserData = async (username) => {
    const usersDB = [
        { username: 'admin', email: 'admin@example.com', role: 'admin' },
        { username: 'user', email: 'user@example.com', role: 'user' }
    ];

    return usersDB.find(u => u.username === username);
};

