const router = require("express").Router();
const Topic = require("../models/topicmodel");
const auth = require("./authRoutes");


router.use(auth)
router.use(Topic)

module.exports =router;