const db = require("../db/queries");


async function addOrUpdate(req, res) {
    await db.addOrUpdate(req.body);
    return;
}

module.exports =  {addOrUpdate};