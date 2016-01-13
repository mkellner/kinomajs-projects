//@module

exports.pins = {
	selectorA: {type: "Digital", direction: "output"},
	selectorB: {type: "Digital", direction: "output"},
	selectorC: {type: "Digital", direction: "output"},
	common: {type: "A2D"}
};

exports.configure = function() {
	this.selectorA.init();
	this.selectorB.init();
	this.selectorC.init();
	this.common.init();
}

exports.close = function() {
	this.selectorA.close();
	this.selectorB.close();
	this.selectorC.close();
	this.common.close();
}

exports.read = function(which) {
	var a, b, c;
	a = which % 2;
	b = (which >> 1) % 2;
	c = (which >> 2) % 2;

	this.selectorA.write(a);
	this.selectorB.write(b);
	this.selectorC.write(c);

	return 1 - this.common.read();
}

exports.readAll = function() {
	var a, b, c, which;
	var output = new Array(8);
	
	for (which=0; which<8; which++) {
		a = which % 2;
		b = (which >> 1) % 2;
		c = (which >> 2) % 2;
	
		this.selectorA.write(a);
		this.selectorB.write(b);
		this.selectorC.write(c);
	
		output[which] = 1 - this.common.read();
        trace("output[" + which + "] is " + output[which] + "\n");

	}
	return output;
//	return JSON.stringify({output: output});;
}

