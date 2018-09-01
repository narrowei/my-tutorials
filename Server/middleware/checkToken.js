// 监测 token 是否过期
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
    console.log("checking token");
    console.log(req.headers['authorization']);
    if(!req.headers['authorization']){
        return res.json({
            code: 401,
            message: 'need login first'
        })
	}
    let token = req.headers['authorization'];
    jwt.verify(token, 'secret', function(err, decoded) {
        // console.log(decoded.exp)
        // console.log(Date.now() / 1000)
        // 监测 token 是否过期
        console.log(decoded);
        if(token && decoded.exp <= Date.now() / 1000) {
            return res.json({
                code: 401,
                message: 'token过期，请重新登录'
            })
        }
        if (err){
        	return res.json({
                code: 401,
                message: err.toString()
            })
		}
        console.log("end checking token");
        next();
    });
};
