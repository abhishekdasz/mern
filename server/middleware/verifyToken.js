const jwt = require("jsonwebtoken");
// const User = require("../model/userSchema");

const verifyToken = async (req, res, next) =>
{
    const token = req.cookies.accessToken;

    if (!token) 
    {
        return res.status(401).json({ message: 'Access token not found' });
    }
    try
    {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
        req.user = decoded; // Store the decoded user information in the request object
        next();
    }
    catch(err)
    {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = verifyToken;