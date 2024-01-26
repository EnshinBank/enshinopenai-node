const express = require("express");
const router = express.Router();
const userCheck = require("../controllers/userCheck")

 router.route("/").get(userCheck);

module.exports = router;