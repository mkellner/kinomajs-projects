//@module
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

// https://github.com/sparkfun/Serial7SegmentDisplay/wiki/Serial-7-Segment-Display-Datasheet
// https://github.com/sparkfun/Serial7SegmentDisplay/wiki/Special-Commands

exports.pins = {
	display: {type: "Serial", baud: 9600}
};

exports.close = function() {
	this.display.close();
}

exports.configure = function() {
	this.display.init();
//	trace("sending 7c-140 for 40% brightness\n");
//	this.display.write(0x7c);
//	this.display.write(140);
}

exports.writeString = function(string) {
//	this.display.write(0xfe);
//	this.display.write(0x01);
	trace("stringlength is " + string.length + "\n");
	for (var i = 0, c = string.length; i < c; ++i) {
		var code = string.charCodeAt(i);
		this.display.write(code);
	}
}

