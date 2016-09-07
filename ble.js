
if (typeof __jerryscript !== "undefined") {
	module.exports = require('./lib/ble.mbed');
} else {
	module.exports = require('./lib/ble.bleno');
}

