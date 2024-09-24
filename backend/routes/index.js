const { Router } = require("express");
const router = Router();

const { viewALL } = require("../controllers/view")

router.get('/', viewALL);


module.exports = router;