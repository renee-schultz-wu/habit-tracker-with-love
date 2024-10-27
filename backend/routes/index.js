const { Router } = require("express");
const router = Router();

const { viewALL, viewUsers, viewTasks } = require("../controllers/view")

router.get('/', viewALL);
router.get('/users', viewUsers);
router.get('/tasks', viewTasks);


module.exports = router; 