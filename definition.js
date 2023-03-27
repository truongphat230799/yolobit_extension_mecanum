const ColorBlock = '#cb2026';
const ImgUrl = 'https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolobit_extension_rover/images/';
Blockly.Blocks['i2c_motor_driver'] = {
    init: function () {
      this.jsonInit(
        {
            "type": "i2c_motor_driver",
            "message0": "quay động cơ %1 tốc độ %2 (-100 đến 100)",
            "args0": [
              {
                "type": "field_dropdown",
                "name": "motor",
                "options": [
                  [
                    "M1",
                    "0"
                  ],
                  [
                    "M2",
                    "1"
                  ],
                  [
                    "M3",
                    "2"
                  ],
                  [
                    "M4",
                    "3"
                  ]
                ]
              },
              {
                "type": "input_value",
                "name": "speed",
                "value": 0,
                "min": -100,
                "max": 100,
                "precision": 50
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#cb2026",
            "tooltip": "",
            "helpUrl": ""
          }
      );
        }
    };

    Blockly.Python['i2c_motor_driver'] = function(block) {
        Blockly.Python.definitions_['import_display'] = 'from yolobit import *';
        Blockly.Python.definitions_['import_machine'] = 'import machine';
        Blockly.Python.definitions_['import_motor_driver'] = 'from i2c_motor_driver import MotorDriver4Channel';
        Blockly.Python.definitions_['create_motor_driver'] = 'driver = MotorDriver4Channel(machine.SoftI2C(scl=machine.Pin(22), sda=machine.Pin(21), freq=100000))\n';
        var dropdown_motor = block.getFieldValue('motor');
        var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
        // TODO: Assemble Python into code variable.
        var code = 'driver.set_motor(' + dropdown_motor + ','+ speed+ ')\n';
        return code;
};

Blockly.Blocks['i2c_motor_delay'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "i2c_motor_delay",
        "message0": "quay động cơ %1 với tốc độ %2 (0-100) trong %3 giây",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": [
              [
                "M1",
                "0"
              ],
              [
                "M2",
                "1"
              ],
              [
                "M3",
                "2"
              ],
              [
                "M4",
                "3"
              ]
            ]
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 50,
            name: "speed",
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            name: "time",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#cb2026",
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["i2c_motor_delay"] = function (block) {
  Blockly.Python.definitions_['import_display'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_motor_driver'] = 'from i2c_motor_driver import MotorDriver4Channel';
  Blockly.Python.definitions_['create_motor_driver'] = 'driver = MotorDriver4Channel(machine.SoftI2C(scl=machine.Pin(22), sda=machine.Pin(21), freq=100000))\n';
  var motor = block.getFieldValue('motor');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'driver.set_motor_time(' + motor + ',' + speed + ", " + time + ')\n';
  return code;
};

Blockly.Blocks['i2c_move_motor'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "i2c_move_motor",
        "message0": "quay động cơ M1 tốc độ %1 M2 %2 M3 %3 M4 %4 (-100 đến 100)",
        "args0": [
          {
            "type": "input_value",
            "name": "motor1",
            "check": "Number",
          },
          {
            "type": "input_value",
            "name": "motor2",
            "check": "Number",
          },
          {
            "type": "input_value",
            "name": "motor3",
            "check": "Number",
          },
          {
            "type": "input_value",
            "name": "motor4",
            "check": "Number",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#cb2026",
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["i2c_move_motor"] = function (block) {
  Blockly.Python.definitions_['import_display'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_motor_driver'] = 'from i2c_motor_driver import MotorDriver4Channel';
  Blockly.Python.definitions_['create_motor_driver'] = 'driver = MotorDriver4Channel(machine.SoftI2C(scl=machine.Pin(22), sda=machine.Pin(21), freq=100000))\n';
  var motor1 = Blockly.Python.valueToCode(block, 'motor1', Blockly.Python.ORDER_ATOMIC);
  var motor2 = Blockly.Python.valueToCode(block, 'motor2', Blockly.Python.ORDER_ATOMIC);
  var motor3 = Blockly.Python.valueToCode(block, 'motor3', Blockly.Python.ORDER_ATOMIC);
  var motor4 = Blockly.Python.valueToCode(block, 'motor4', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'driver.set_motor(0,'+ motor1+ ')\n' + 'driver.set_motor(1,'+ motor2+ ')\n'+ 'driver.set_motor(2,'+ motor3+ ')\n'+ 'driver.set_motor(3,'+ motor4+ ')\n';
  return code;
};
Blockly.Blocks['mecanum_stop'] = {
  init: function () {
    this.jsonInit({
      "type": "mecanum_stop",
      "message0": "%1 dừng di chuyển",
      "args0": [
        {
          "type": "field_image",
          "src":  ImgUrl + 'stop.svg',
          "width": 20,
          "height": 20,
          "alt": "*",
          "flipRtl": false
        }],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": ColorBlock,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Python["mecanum_stop"] = function (block) {
  Blockly.Python.definitions_['import_display'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_motor_driver'] = 'from i2c_motor_driver import MotorDriver4Channel';
  Blockly.Python.definitions_['create_motor_driver'] = 'driver = MotorDriver4Channel(machine.SoftI2C(scl=machine.Pin(22), sda=machine.Pin(21), freq=100000))\n';
  // TODO: Assemble Python into code variable.
  var code = "driver.set_motors(0)\n";
  return code;
};

// Line Array
Blockly.Blocks['mecanum_line_sensor_read_all'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "mecanum_line_sensor_read_all",
        "message0": "%1 cảm biến line phát hiện S1 %2 S2 %3 S3 %4 S4 %5",
        "args0": [
          {
            "type": "field_image",
            "src": ImgUrl + 'line.svg',
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "S1",
            "options": [
              [
                {
                  "src": ImgUrl + 'line_finder_none_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "none"
                },
                "0"
              ],
              [
                {
                  "src": ImgUrl + 'line_finder_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "detect"
                },
                "1"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "S2",
            "options": [
              [
                {
                  "src": ImgUrl + 'line_finder_none_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "none"
                },
                "0"
              ],
              [
                {
                  "src": ImgUrl + 'line_finder_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "detect"
                },
                "1"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "S3",
            "options": [
              [
                {
                  "src": ImgUrl + 'line_finder_none_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "none"
                },
                "0"
              ],
              [
                {
                  "src": ImgUrl + 'line_finder_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "detect"
                },
                "1"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "S4",
            "options": [
              [
                {
                  "src": ImgUrl + 'line_finder_none_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "none"
                },
                "0"
              ],
              [
                {
                  "src": ImgUrl + 'line_finder_detect.png',
                  "width": 15,
                  "height": 15,
                  "alt": "detect"
                },
                "1"
              ]
            ]
          }
        ],
        "colour": ColorBlock,
        "output": "Boolean",
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["mecanum_line_sensor_read_all"] = function (block) {
  Blockly.Python.definitions_['import_mecanum'] = 'from mecanum import *';
  var S1 = block.getFieldValue("S1");
  var S2 = block.getFieldValue("S2");
  var S3 = block.getFieldValue("S3");
  var S4 = block.getFieldValue("S4");
  // TODO: Assemble Python into code variable.
  var code = "mecanum.read_line_sensors() == (" + S1 + ", " + S2 + ", " + S3 + ", " + S4 + ")";
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Blocks['mecanum_line_sensor_read_single'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "mecanum_line_sensor_read_single",
        "message0": "%1 cảm biến line đọc giá trị %2",
        "args0": [
          {
            "type": "field_image",
            "src": ImgUrl + 'line.svg',
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
          },
          {
            "type": "field_dropdown",
            "name": "pin",
            "options": [
              ["S1", "1"],
              ["S2", "2"],
              ["S3", "3"],
              ["S4", "4"],
            ],
          },
        ],
        "colour": ColorBlock,
        "output": "",
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["mecanum_line_sensor_read_single"] = function (block) {
  Blockly.Python.definitions_['import_mecanum'] = 'from mecanum import *';
  var pin = block.getFieldValue("pin");
  // TODO: Assemble Python into code variable.
  var code = "mecanum.read_line_sensors(" + pin + ")";
  return [code, Blockly.Python.ORDER_NONE];
};
 // HCSR04 
 Blockly.Blocks['mecanum_ultrasonic_create'] = {
  /**
   * Block for waiting.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit(
      {
        "type": "mecanum_ultrasonic_create",
        "message0": "%3 khởi tạo cảm biến khoảng cách với chân trigger %1 chân echo %2",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "TRG",
            "options": [
              [
                "P3",
                "pin3"
              ],
              [
                "P0",
                "pin0"
              ],
              [
                "P1",
                "pin1"
              ],
              [
                "P2",
                "pin2"
              ],
              [
                "P4",
                "pin4"
              ],
              [
                "P5",
                "pin5"
              ],
              [
                "P6",
                "pin6"
              ],
              [
                "P7",
                "pin7"
              ],
              [
                "P8",
                "pin8"
              ],
              [
                "P9",
                "pin9"
              ],
              [
                "P10",
                "pin10"
              ],
              [
                "P11",
                "pin11"
              ],
              [
                "P12",
                "pin12"
              ],
              [
                "P13",
                "pin13"
              ],
              [
                "P14",
                "pin14"
              ],
              [
                "P15",
                "pin15"
              ],
              [
                "P16",
                "pin16"
              ],
              [
                "P19",
                "pin19"
              ],
              [
                "P20",
                "pin20"
              ]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "ECH",
            "options": [
              [
                "P6",
                "pin6"
              ],
              [
                "P0",
                "pin0"
              ],
              [
                "P1",
                "pin1"
              ],
              [
                "P2",
                "pin2"
              ],
              [
                "P3",
                "pin3"
              ],
              [
                "P4",
                "pin4"
              ],
              [
                "P5",
                "pin5"
              ],
              [
                "P7",
                "pin7"
              ],
              [
                "P8",
                "pin8"
              ],
              [
                "P9",
                "pin9"
              ],
              [
                "P10",
                "pin10"
              ],
              [
                "P11",
                "pin11"
              ],
              [
                "P12",
                "pin12"
              ],
              [
                "P13",
                "pin13"
              ],
              [
                "P14",
                "pin14"
              ],
              [
                "P15",
                "pin15"
              ],
              [
                "P16",
                "pin16"
              ],
              [
                "P19",
                "pin19"
              ],
              [
                "P20",
                "pin20"
              ]
            ]
          },
          {
            "type": "field_image",
            "src": ImgUrl + 'ultrasonic.png',
            "width": 20,
            "height": 20,
            "alt": "*",
            "flipRtl": false
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": "Khởi tạo cảm biến khoảng cách với 2 chân cắm Trigger và Echo được chọn",
        "helpUrl": ""
      }
    );
  },
  getDeveloperVars: function () {
    return ['mecanum_ultrasonic'];
  }
};

Blockly.Python['mecanum_ultrasonic_create'] = function (block) {
  var dropdown_trg = block.getFieldValue('TRG');
  var dropdown_ech = block.getFieldValue('ECH');
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_ultrasonic'] = 'from aiot_hcsr04 import HCSR04';
  var code = 'mecanum_ultrasonic = HCSR04(trigger_pin=' + dropdown_trg + '.pin, echo_pin=' + dropdown_ech + '.pin)\n';
  return code;
};

Blockly.Blocks['mecanum_ultrasonic_read'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "mecanum_ultrasonic_read",
        "message0": "%2 đọc cảm biến khoảng cách theo %1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
              [
                "cm",
                "CM"
              ],
              [
                "mm",
                "MM"
              ]
            ]
          },
          {
            "type": "field_image",
            "src": ImgUrl + 'ultrasonic.png',
            "width": 20,
            "height": 20,
            "alt": "*",
            "flipRtl": false
          }
        ],
        "output": null,
        "colour": ColorBlock,
        "tooltip": "Đọc giá trị đo được của cảm biến khoảng cách",
        "helpUrl": ""
      }
    );
  },
  getDeveloperVars: function () {
    return ['mecanum_ultrasonic'];
  }
};

Blockly.Python['mecanum_ultrasonic_read'] = function (block) {
  var dropdown_type = block.getFieldValue('TYPE');
  // TODO: Assemble Python into code variable.
  var code = '';
  if (dropdown_type == 'CM') {
    code = 'mecanum_ultrasonic.distance_cm()';
  } else {
    code = 'mecanum_ultrasonic.distance_mm()';
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['mecanum_ultrasonic_checkdistance'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "mecanum_ultrasonic_checkdistance",
        "message0": "cảm biến khoảng cách đọc được < %1 %2 %3",
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "input_value",
            "name": "DISTANCE",
            "check": "Number"
          },
          {
            "type": "field_dropdown",
            "name": "TYPE",
            "options": [
              [
                "cm",
                "CM"
              ],
              [
                "mm",
                "MM"
              ]
            ]
          }
        ],
        "output": "Boolean",
        "colour": ColorBlock,
        "tooltip": "Kiểm tra xem khoảng cách đo được của cảm biến có lớn hơn giá trị được chọn hay không",
        "helpUrl": ""
      }
    );
  },
  getDeveloperVars: function () {
    return ['aiot_ultrasonic'];
  }
};

Blockly.Python['mecanum_ultrasonic_checkdistance'] = function (block) {
  var value_distance = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.Python.ORDER_ATOMIC);
  var dropdown_type = block.getFieldValue('TYPE');
  // TODO: Assemble Python into code variable.
  var code = '';
  if (dropdown_type == 'CM')
    code = 'mecanum_ultrasonic.distance_cm() < ' + value_distance;
  else
    code = 'mecanum_ultrasonic.distance_mm() < ' + value_distance;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
