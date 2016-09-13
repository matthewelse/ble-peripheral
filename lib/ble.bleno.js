var bleno = require('bleno');

module.exports = bleno;

module.exports.Characteristic.prototype.updateValueCallback = null;

module.exports.Characteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback){
    this.updateValueCallback = updateValueCallback;
}

module.exports.Characteristic.prototype.onUnsubscribe = function(maxValueSize, updateValueCallback){
    this.updateValueCallback = null;
}

module.exports.Characteristic.prototype.write = function(data) {
    if (this.updateValueCallback) {
        // convert the data to a Buffer
        let b = Buffer.alloc(data.length);

        for (let i = 0; i < data.length; i++) {
            b.writeUInt8(data[i], i);
        }

        this.updateValueCallback(b);
    }
}

module.exports._connected = false;

module.exports.onConnection = function(f) {
    bleno.on('accept', function() {
        module.exports._connected = true;
        f();
    });
}

module.exports.onDisconnection = function(f) {
    bleno.on('disonnect', function() {
        module.exports._connected = false;
        f();
    })
}

module.exports.ready = function(f) {
    bleno.on('stateChange', function(state) {
        if (state === 'poweredOn') {
            f();
        }
    })
}

module.exports.isConnected = function() {
    return module.exports._connected;
}



