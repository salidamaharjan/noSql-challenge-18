const router = require("express").Router();
const { Thought } = require("../../models");

//get all the thoughts
router.get("/", async (req, res) => {
  const thought = await Thought.find();
  res.status(200).json(thought);
});

//create a new thought
router.post("/", async (req, res) => {
  const thought = await Thought.create(req.body);
  res.status(200).json(thought);
});

module.exports = router;
