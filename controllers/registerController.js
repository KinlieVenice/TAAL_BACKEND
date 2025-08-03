const User = require("../model/User");
const bcrypt = require("bcrypt");

const createNewUser = async (req, res) => {
    const { username, password} = req.body;
    if (!username || !password) return res.status(400).json({
        'message': 'Both username and password needed'
    });

    const duplicate = await User.findOne({ username });
    if (duplicate) return res.status(409).json({ 'message': 'Username already exists'});

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await User.create({
            username,
            password: hashedPassword
        });

        res.status(202).json({ 'message': 'Account successfully created'})
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
};


module.exports = { createNewUser };

