//@program

Handler.bind("/analogData", {
	onInvoke: function(handler, message) {
		var result = message.requestObject;
        trace("val: " + formatAnalog(result) + "\n");
	}
});

var model = application.behavior = Object.create(Object.prototype, {
	onComplete: { value: function(application, message) {
        if (0 != message.error) {
			trace("error onComplete: " + message.error + "\n");
            return;
        }
        
        // axis values

        trace("onComplete, error " + message.error + "\n");
        application.invoke(new MessageWithObject("pins:/analog/read?repeat=on&callback=/analogData&interval=30"));
	}},
	onLaunch: { value: function(application) {
        application.invoke(new MessageWithObject("pins:configure", {
            analog: {
                require: "analog",
                pins: {
                    analog: {pin: 0},		// edison A0
                }
            }}), Message.JSON);
	}},
});


function formatAnalog(val)
{
    val = ((val * 100000) | 0) / 100000;
    var result = val.toPrecision(5).toString();
    if (0 == result)
        result = "  0.00000";
    else {
        if (result >= 0)
            result = "+" + result;
        if (result.length < 8)
            result += "00000000".slice(0, 8 - result.length);
    }
    return result;
}

