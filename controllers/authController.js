const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status.json({ 'message': 'Both username and password needed'});

    const foundUser = await User.findOne( { username });

    if (!foundUser) return res.status(401);

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign( 
            {
                userInfo: {
                    username: foundUser.username,
                    roles: roles
                },
            },
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "1h"}
            );
            const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // saving refresh token w current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};
module.exports = { handleLogin };

