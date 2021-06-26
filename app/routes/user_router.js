const router = require("express").Router();
const UserController = require("../controllers/user_controller");
const { protects, permission } = require("../middlewares/auth");

router.get('/', protects, permission(['admin', 'user']), UserController.getUsers);
router.put('/', protects, permission(['admin', 'user']), UserController.updateUser);

module.exports = router;
