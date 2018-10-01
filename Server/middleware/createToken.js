// create token
// reference: http://www.tuicool.com/articles/uuAzAbU
var jwt = require('jsonwebtoken');

module.exports = function (name) {

	const token = jwt.sign({
		name: name
	}, 'secret', { expiresIn: '6000s' });
	return token;
}
