const db = require("../db/queries");

async function viewALL(req, res) {
    const data = await db.viewALL();
    res.render("index", { daten: data });
}

module.exports = { viewALL }