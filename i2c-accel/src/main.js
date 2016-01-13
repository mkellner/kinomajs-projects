//@program
/*
  Copyright 2011-2014 Marvell Semiconductor, Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

Handler.bind("/accelData", {
	onInvoke: function(handler, message) {
        var data = model.data;

		data.axes = message.requestObject;
        data.axes.y *= -1;        // adjust y for Kinoma Create orientation
        
        trace("x: " + formatAcceleration(data.axes.x) + "y: " + formatAcceleration(data.axes.y)
        	 + "z: " + formatAcceleration(data.axes.z) + "\n");
	}
});

var model = application.behavior = Object.create(Object.prototype, {
	onComplete: { value: function(application, message) {
        if (0 != message.error) {
            return;
        }
        
        // axis values

        trace("onComplete, error " + message.error + "\n");
        application.invoke(new MessageWithObject("pins:/tesselAccelerometer/read?repeat=on&callback=/accelData&interval=30"));
	}},
	onLaunch: { value: function(application) {
        application.invoke(new MessageWithObject("pins:configure", {
            tesselAccelerometer: {
                require: "tesselAccelerometer",
                pins: {
//                    accelerometer: {sda: 27, clock: 29, bus: 1, outputRate: 50}
                    accelerometer: {sda: 18, clock: 19,  bus: 6, outputRate: 50}
                }
            }}), Message.JSON);

		this.data = { axes: {x: 0, y: 0, z: 0} };
	}},
});


function formatAcceleration(val)
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

