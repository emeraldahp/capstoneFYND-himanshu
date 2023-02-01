const jwt = require('jsonwebtoken');

const authorize = (roles) => {

    return (req, res, next) => {
        const token = req.header('Authorization');

        jwt.verify(token, process.env.JWT_SECRET, function (err, claims) {
            if (err) {
                res.status(401).send("Unauthorized: " + err.message)
                return
            }
            if(roles.includes(claims.role)) {
                res.locals.claims = claims;
                next();
            }
            else {
                res.status(401).send("Unauthorized: resource access denied")
                return
            }
        });
    }
}

module.exports = { authorize };