const { Router } = require("express");
const router = Router();

const { viewTally, countWeeklyTally } = require("../controllers/view")

router.get('/', viewTally);
router.get('/:id', countWeeklyTally);

module.exports = router; 