//validate json token
const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    if(!req.headers['authorization']){
        return res.json({
            code: 401,
            message: 'need login first'
        })
	}
    let token = req.headers['authorization'];
    jwt.verify(token, 'secret', function(err, decoded) {
        if(token && decoded.exp <= Date.now() / 1000) {
            return res.json({
                code: 401,
                message: 'token expired'
            })
        }
        if (err){
        	return res.json({
                code: 401,
                message: err.toString()
            })
		}
        next();
    });
};
