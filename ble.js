
if (typeof __jerryscript !== "undefined") {
	module.exports = require('./lib/ble.mbed');
} else {
    print = console.log;
	module.exports = require('./lib/ble.bleno');
}

