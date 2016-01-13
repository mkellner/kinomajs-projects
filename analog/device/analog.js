//@module

trace('in analog.js\n');
exports.pins = {
    analog: {type: "A2D"},
};

exports.configure = function() {
	trace("analog configure\n");
    this.analog.init();
}

exports.read = function() {
	trace("analog read\n");
	return this.analog.read();
}

exports.close = function() {
	trace("analog close\n");
	this.analog.close();
}

