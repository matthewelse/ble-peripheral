var bleno = require('bleno');

module.exports = bleno;

module.exports.Characteristic.prototype.write = function(data) {
    this.updateValueCallback(data);
}

