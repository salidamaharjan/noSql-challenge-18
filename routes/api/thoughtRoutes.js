const router = require("express").Router();
const { Thought } = require("../../models");

//get all the thoughts
router.get("/", async (req, res) => {
  const thought = await Thought.find();
  res.status(200).json(thought);
});

//get the thought by Id
router.get("/:id", async (req, res) => {
  const thoughtById = await Thought.findOne({_id: req.params.id});
  !thoughtById
  ? req.status(404).json({ message: "No thought found with that ID." })
  : res.json(thoughtById);
})

//create a new thought
router.post("/", async (req, res) => {
  const thought = await Thought.create(req.body);
  res.status(200).json(thought);
});

module.exports = router;
