const pool = require("./pool");

async function viewALL() {
    const { rows } = await pool.query("select * from timelog");
    return rows;
}



module.exports = { viewALL }