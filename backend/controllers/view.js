const db = require("../db/queries");

async function viewALL(req, res) {
    const data = await db.viewWeek();
    //res.render("index", { daten: data });
    res.json(data);
}

async function viewTally(req, res) {
    const data = await db.viewTally();
    res.json(data);
}

async function viewUsers(req, res) {
    const data = await db.viewUsers();
    res.json(data);
}

async function viewTasks(req, res) {
    const data = await db.viewTasks();
    res.json(data);
}

module.exports = { viewALL, viewTally, viewTasks, viewUsers }