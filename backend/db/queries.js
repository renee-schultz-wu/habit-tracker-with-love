const pool = require("./pool");

async function viewWeek() {
    const { rows } = await pool.query("SELECT * FROM timelog WHERE date >= date_trunc('week', ( CURRENT_DATE  + interval '1' day)) - interval '28' day");
    return rows;
}

async function viewTally() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

async function addOrUpdate(file) {
    console.log(file);
    const text = "INSERT INTO timelog (date, person, task, complete) VALUES ($1, $2, $3, $4) ON CONFLICT (date, person, task) DO UPDATE SET complete = excluded.complete";
    const values = [file.date, file.person, file.task, file.complete]
    await pool.query(
        text,
        values
    );
    return;
}

async function viewTasks() {
    const { rows } = await pool.query("SELECT task FROM tasklist");
    return rows;
}

async function viewUsers() {
    const { rows } = await pool.query("SELECT name FROM users");
    return rows;
}

module.exports = { viewWeek, viewTally, addOrUpdate, viewTasks, viewUsers }