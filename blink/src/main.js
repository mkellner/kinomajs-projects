

var item = true;

var Pins = require('pins'); // Pin Configuration

application.behavior = Behavior({
	onLEDWrite(application, data) {
		trace("onLEDWrite\n");
		item = !item;
	},

	onLaunch(application) {
		var message = new MessageWithObject("pins:configure", {
			LED: {
				require: "led",
				pins: {
//					led: {pin: 59 },	// Create
					led: {pin: 13 },	// edison
				}
			}
		});
		message.invoke().then(function(){application.behavior.onPinsConfigured(application, true)});
		trace('after pinsConfigure');
	},
	onPinsConfigured(application, success) {
		trace('onPinsConfigured');
		if (!success) {
			trace('failed to configure');
			return;
		}

		let message = new MessageWithObject("pins:/LED/blink?repeat=on&interval=500");
		application.invoke(message);
//		Pins.repeat({'/LED/write', item}, 500, data => this.onLEDWrite(application, data));
		trace('blink\n');
	}
});

