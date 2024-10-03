const { Router } = require("express");
const router = Router();

const { addOrUpdate } = require("../controllers/edit")

router.get('/', addOrUpdate);
router.post('/', addOrUpdate);


module.exports = router; 