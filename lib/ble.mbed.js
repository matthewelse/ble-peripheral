
// define a globabl ble object, BLECharacteristic, BLEService

module.exports = BLEDevice();

// ble.startAdvertising([name:str], [uuid:int]) already implemented

module.exports.PrimaryService = function(obj) {
    if (typeof obj.uuid === "undefined") {
        throw new Error("No service UUID specified :(");
    }

    // in case for some odd reason you don't want any characteristics with your service
    if (typeof obj.characteristics === "undefined") {
        obj.characteristics = [];
    }

    var raw_chars = [];
    for (var i = 0; i < obj.characteristics.length; i++) {
        raw_chars.push(obj.characteristics[i]._base);
    }

    this._base = BLEService(obj.uuid, raw_chars);
}

// services don't really have much else interesting about them

var Characteristic = function(obj) {
    if (typeof obj.uuid === "undefined") {
        throw new Error("No characteristic UUID specified :(");
    } else if (typeof obj.properties === "undefined") {
        throw new Error("No characteristic properties specified :(");
    }

    this._base = BLECharacteristic(obj.uuid, obj.properties, 23);
}

Characteristic.prototype.write = function(data) {
    this._base.write(data);
}

module.exports.Characteristic = Characteristic;

var Descriptor = function(obj) {
    throw new Error("Descriptor not supported :(");
}

module.exports.Descriptor = Descriptor;

module.exports.setServices = function(s) {
    var base_services = [];

    for (var i = 0; i < s.length; i++) {
        print(s[i]._base);
        base_services.push(s[i]._base);
    }

    module.exports.addServices(base_services);
}
