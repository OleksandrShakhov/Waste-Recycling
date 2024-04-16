import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('recyclingGame.db');

export const setupDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY AUTOINCREMENT, playerName TEXT, score INTEGER);'
        );
    });
};

export const insertResult = (playerName, score) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql(
                    'INSERT INTO results (playerName, score) VALUES (?, ?)',
                    [playerName, score],
                    (_, { rowsAffected }) => {
                        if (rowsAffected > 0) {
                            resolve();
                        } else {
                            reject(new Error('Failed to insert result'));
                        }
                    },
                    (_, error) => reject(error)
                );
            },
            error => reject(error)
        );
    });
};

export const getAllResults = () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql(
                    'SELECT * FROM results ORDER BY score DESC',
                    [],
                    (_, { rows }) => {
                        const results = [];
                        for (let i = 0; i < rows.length; i++) {
                            results.push(rows.item(i));
                        }
                        resolve(results);
                    },
                    (_, error) => reject(error)
                );
            },
            error => reject(error)
        );
    });
};
