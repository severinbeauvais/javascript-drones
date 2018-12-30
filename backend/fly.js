// "use strict";

const dgram = require('dgram');
const wait = require('waait');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const throttle = require('lodash/throttle');
const commandDelays = require('./commandDelays');

const PORT = 8889;
const HOST = '192.168.10.1';

// socket to send command + receive response
const drone = dgram.createSocket('udp4');
drone.bind(PORT);

// socket to receive Tello state
const droneState = dgram.createSocket('udp4');
droneState.bind(8890);

drone.on('message', (message) => {
  console.log('-> ${message}');
});

droneState.on('message', (message) => {
  console.log('->', message);
});

// socket to receive Tello video
// const droneVideo = dgram.createSocket('udp4');
// droneVideo.bind (11111);

function handleError(err) {
  if (err) {
    console.log('ERROR =', err);
  }
}

console.log('Starting...');
// drone.send('command', 0, 7, PORT, HOST, handleError);
// drone.send('battery?', 0, 8, PORT, HOST, handleError);

// const commands = ['command', 'battery?', 'takeoff', 'land'];
const commands = ['command', 'battery?', 'speed?', 'time?'];

let i = 0;

// NB: jshint doesn't know about async/await (which is a feature of ES2017/ES8)
/* jshint ignore:start */
async function go() {
  const command = commands[i];
  const delay = commandDelays[command];
  console.log('running command =', command);
  drone.send(command, 0, command.length, PORT, HOST, handleError);
  await wait(delay);
  if (++i < commands.length) {
    return go();
  }
  console.log('Done!');
}
/* jshint ignore:end */

go();
