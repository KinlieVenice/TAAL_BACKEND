const express = require("express");
const router = express.Router();
const rolesController = require("../../controllers/rolesController");

router.route('/:id/roles')
    .put(rolesController.addRole)
    .delete(rolesController.deleteRole);


module.exports = router;
