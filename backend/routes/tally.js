const { Router } = require("express");
const router = Router();

const { viewTally } = require("../controllers/view")

router.get('/', viewTally);


module.exports = router; 