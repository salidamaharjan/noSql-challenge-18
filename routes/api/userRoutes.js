const router = require("express").Router();
const { User, Thought } = require("../../models");

//get all the users
router.get("/", async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

//get the user by id
router.get("/:id", async (req, res) => {
  const userById = await User.findOne({ _id: req.params.id });
  !userById
    ? req.status(404).json({ message: "No user found with that ID." })
    : res.json(userById);
});

//update the user by id
router.put("/:id", async (req, res) => {
  const userById = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  !userById ? res.status(404).json({
    message: 'No user with that ID',
  }): res.json('User created');
});

//create a new user
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

//delete a user by id
router.delete('/:id', async (req, res) => {    
    const userById = await User.findOneAndDelete({_id: req.params.id});
    await Thought.deleteMany({_id: {$in: userById.thoughts}});
    !userById ? res.status(404).json({
        message: 'No user with that ID',
      }) : res.json(`User with Id-> ${req.params.id} deleted`);
})

module.exports = router;
