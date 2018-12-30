// ref: https://github.com/jsolderitsch/tello-nodejs/blob/master/TelloMissionFile.js

const commandDelays = {
  command: 500,
  takeoff: 5000,
  land: 5000,
  up: 7000,
  down: 7000,
  left: 5000,
  go: 7000,
  right: 5000,
  forward: 5000,
  back: 5000,
  cw: 5000,
  ccw: 5000,
  flip: 3000,
  speed: 3000,
  'speed?': 500,
  'battery?': 500,
  'time?': 500,
  'height?': 500,
  'temp?': 500,
  'attitude?': 500,
  'baro?': 500,
  'acceleration?': 500,
  'tof?': 500,
  'wifi?': 500
};

module.exports = commandDelays;
