const router = require('express').Router();
const { User} = require('../../models');

router.get('/', async ( req, res) => {
    const user = await User.find();
    res.status(200).json(user);
});

router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

module.exports = router;