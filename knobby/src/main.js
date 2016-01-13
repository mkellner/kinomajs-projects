let Pins = require("pins");

application.behavior = Behavior({
	onLaunch(application) {
		var message = new MessageWithObject("pins:configure", {
            knobby: {
                require: "knobbyBLL",
                pins: {
					selectorA: { pin: 7 },
					selectorB: { pin: 6 },
					selectorC: { pin: 5 },
					common: { pin: 0 }
                }
            }
		});
		message.invoke().then(function(){application.behavior.onPinsConfigured(application, true)});
	},
	onPinsConfigured(application, success) {	
		if (success) {
			Pins.repeat("/knobby/readAll", 1000, function(result) {
				var i;
				for (i=0; i<8; i++) {
					trace(result[i].toFixed(2) + " ");
				}
				trace("\n");
			});
		}
		else {
			trace("Failed to load BLL\n");
		}
	},
});

