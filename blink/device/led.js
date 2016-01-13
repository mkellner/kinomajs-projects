//@module

trace('in led.js');
exports.pins = {
    led: {type: "Digital", direction: "output"},
};

exports.configure = function() {
	trace("led configure");
    this.led.init();
}

exports.turnOn = function() {
    this.led.write(	1 );
}
    
exports.turnOff = function() {
    this.led.write( 0 );
}

var val = true;
exports.blink = function() {
	this.led.write(val);
	val = !val;
}
