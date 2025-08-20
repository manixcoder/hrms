import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hrms'
});

con.connect(function (err) {
    if (err) {
        console.log("Error connecting to the database:", err);
    } else {
        console.log("Database connection established successfully.");
    }
});

export default con;

