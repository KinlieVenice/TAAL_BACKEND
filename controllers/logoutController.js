const User = require('../model/User')

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken })
    if (!foundUser) {
        res.clearCookie("jwt", {
            http: true,
            sameSite: "None",
        })
        return res.sendStatus(204)
    }

    foundUser.refreshToken = '';
    const result = await foundUser.save();
    res.clearCookie("jwt", {
      http: true,
      sameSite: "None",
    });
    res.sendStatus(200);
};

module.exports = { handleLogout }