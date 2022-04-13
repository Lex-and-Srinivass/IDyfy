const express = require("express");
const router = express.Router();

//const { protect } = require("../middleware/auth");
const { get_details } = require("../controllers/admin/get_details");
const { get_ideas } = require("../controllers/admin/get_ideas");

router.route("/get-details").get(get_details);
router.route("/get-ideas").get(get_ideas);

module.exports = router;