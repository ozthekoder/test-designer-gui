import uuid from 'uuid'
import Hashids from 'hashids'
import Immutable from 'immutable'
import plugins from '../plugins';
const hash = new Hashids('ozrulez');
export default class Defaults {
  static blueprint(type, override = {}) {
    this.OP_COUNT++;
    switch (type) {
      case 'multiple':
        return Immutable.fromJS(Object.assign({}, this.OPS, override, { $id : uuid.v4() }))
      break;
      default:
        return Immutable.fromJS(Object.assign({}, this.OP, override, { $plugin: type, $id: uuid.v4() }))
      break;
    }
  }

  static configuration() {
    return Immutable.fromJS(this.CONFIG);
  }
}

Defaults.OP_COUNT = -1;

Defaults.OP = {
  $name: '',
  $log: '',
  $skip: false,
  $halt: false,
  $before: [],
  $beforeEach: [],
  $plugin: '',
  $op: '',
  $timeout: 5000,
  $args: [],
  $payload: {},
  $afterEach: [],
  $after: [],
  $lookup: false,
  $repeat: 0
}

Defaults.OPS = {
  $name: '',
  $log: '',
  $skip: false,
  $halt: false,
  $before: [],
  $beforeEach: [],
  $ops: [],
  $afterEach: [],
  $after: [],
  $lookup: false,
  $repeat: 0
}

Defaults.KEYS = {
  "$id": "string",
  "$log": "string",
  "$name": "string",
  "$before": "array",
  "$beforeEach": "array",
  "$afterEach": "array",
  "$plugin": "string",
  "$op": "string",
  "$skip": "boolean",
  "$halt": "boolean",
  "$ops": "array",
  "$args": "array",
  "$lookup": "boolean",
  "$repeat": "number",
  "$payload": {
    "$expect": {
      "$value": "number|string|array|object",
      "$assert": "string",
      "$log": "string"
    },
    "$save": "string|object",
    "$waitFor": {
      "$value": "number|string|object",
      "$log": "string"
    }
  },
  "$timeout": "number",
  "$after": "array"
}

Defaults.CONFIG = {
  "output": {
    "console": true,
    "report": false
  },
  "plugins": {
    "http": {
      "file": "./plugins/http",
      "host": "localhost",
      "port": 80,
      "path": "",
      "interface": plugins.http,
      "active": true
    },
    "kafka": {
      "file": "./plugins/kafka",
      "host": "localhost",
      "port": 1121,
      "topics": ["test"],
      "groupId": "api_tester",
      "interface": plugins.kafka,
      "active": true
    },
    "wait": {
      "file": "./plugins/wait",
      "interface": plugins.wait,
      "active": true
    }
  }
}
