const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const token = req.header('Authorization');

    jwt.verify(token, process.env.JWT_SECRET, function (err, claims) {
        if (err) {
            res.status(401).send("Unauthorized: " + err.message)
        }
        
        res.locals.claims = claims;

        next();
    });
};

module.exports = { authorize };