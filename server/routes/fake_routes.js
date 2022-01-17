const express = require("express");
const router = express.Router();

const {
    fake_idea
} = require('../utils/fake data/faker-ideas');

const {
    fake_features
} = require('../utils/fake data/faker-features');

router.route("/create-fake-ideas").post(fake_idea);
router.route("/create-fake-features").post(fake_features);

module.exports = router;