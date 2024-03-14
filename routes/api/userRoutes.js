const router = require('express').Router();
const { User} = require('../../models');

router.get('/', async ( req, res) => {
    const user = await User.find();
    res.status(200).json(user);
});
router.get('/:id', async( req, res) => {
    const userById = await User.findOne({_id: req.params.id });
    !userById ? req.status(404).json({message: "No user found with that ID."}) : res.json(userById);
});

router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

module.exports = router;