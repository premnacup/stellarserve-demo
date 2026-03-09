const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./stellarserve.db");

db.serialize(() => {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
        if (err) {
            console.error("Error listing tables:", err);
        } else {
            console.log("Existing tables:", tables.map(t => t.name));
        }
    });

    db.all("PRAGMA table_info(orders)", (err, rows) => {
        if (err) {
            console.error("Error getting orders info:", err);
        } else {
            console.log("Orders table info:", rows);
        }
        db.close();
    });
});
