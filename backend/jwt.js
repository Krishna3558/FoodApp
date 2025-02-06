const jwt = require('jsonwebtoken');

const jwtAuth = (req , res , next) => {
    try{
        const authenticate = req.headers.authorization;
        if(!authenticate) return res.status(401).json({message: "not authorized"});

        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.status(401).json({message: "token not found"});

        const decoded = jwt.verify(token , process.env.jwt_secret);
        req.user = decoded;
        next();
    }
    catch(err){
        console.error(err);
    }
}

const genToken = (user) => {
    if (!user || typeof user !== "object") {
        throw new Error("Invalid user data for JWT token");
    }
    return jwt.sign(user , process.env.jwt_secret );
}

module.exports = {jwtAuth , genToken};