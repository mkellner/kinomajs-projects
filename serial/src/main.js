//@program
var serial = require("serial");

// model
var model = application.behavior = Object.create(Object.prototype, {
	onComplete: { value: function(application, message) {
		trace("onComplete\n");
        if (0 != message.error) {
			trace("Error " + message.error + "\n");
            return;
        }

		if (false == this.data.ticker.started) {
			this.updateTicker(application);
		}
		// Display the keyboard screen
   		application.start();
	}},
	onLaunch: { value: function(application) {
        application.invoke(new MessageWithObject("pins:configure", {
            serial: {
                require: "serial",
                pins: {
//                    display: {tx: 31}
//                    display: {tx: 1}		// edison
                    display: {tx: 8}		// rpi
                }
            }}), Message.JSON);

        this.data = {
        	ticker: {
        		started: false,
        		string: "Big test $tring 1234567890"
        	}
        };
		trace("after OnLaunch\n");
    }},
	updateTicker: { value: function(application) {
		var ticker = this.data.ticker;
		var string = ticker.string;
		trace("updateTicker\n");
        application.invoke(new MessageWithObject("pins:/serial/writeString", string));
		this.data.ticker.started = true;
	}},
});


