const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin.js");

const withJwt = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken


        if (!token) {
            console.log("could not found token in cookie")
            return res.status(401).json({
                messege: "Unauthorized request"
            })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const admin = await Admin.findById(decodedToken?.id)
        if (!admin) {
            return res.status(401).json({
                message: "Invalid access toekn"
            })
        }

        next();
    } catch (e) {
        return res.status(401).json({
            messege: "can not authenticate user"
        }

        )
    }
}

module.exports = withJwt