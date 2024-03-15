const router = require("express").Router();
const { Thought, User } = require("../../models");
const { findOneAndUpdate } = require("../../models/User");

//get all the thoughts
router.get("/", async (req, res) => {
  const thought = await Thought.find();
  res.status(200).json(thought);
});

//get the thought by Id
router.get("/:id", async (req, res) => {
  const thoughtById = await Thought.findOne({ _id: req.params.id });
  !thoughtById
    ? req.status(404).json({ message: "No thought found with that ID." })
    : res.json(thoughtById);
});

//create a new thought
router.post("/", async (req, res) => {
  const thought = await Thought.create(req.body);
  const user = await User.findOneAndUpdate(
    { _id: req.body.userId },
    { $addToSet: { thoughts: thought._id } },
    { new: true }
  );
  !user
    ? res.status(404).json("Thought created, but no user found with that ID")
    : res.status(200).json(thought);
});

//update thoughts
router.put("/:id", async (req, res) => {
  const thoughtById = await Thought.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { thoughtText: req.body.thoughtText } }
  );
  !thoughtById
    ? res.status(404).json("ID not found")
    : res.status(200).json("Thought updated!");
});

//delete thought
router.delete("/:id", async (req, res) => {
  const thoughtById = await Thought.findOneAndDelete({_id: req.params.id});
  !thoughtById ? res.status(404).json("Thought not found!") : res.status(200).json('Thought deleted!');
});

module.exports = router;
