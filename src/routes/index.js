const express = require('express');
const router = require("express").Router();
const user = require("./userRoutes");
const entry = require("./entryRoutes");
const topic = require("./topicRoutes");
const auth = require("./authRoutes");

router.use(user)
router.use(entry)
router.use(auth)
router.use(topic)

module.exports =router;