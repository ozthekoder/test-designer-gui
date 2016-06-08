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
        return Immutable.fromJS(Object.assign({}, this.OPS, override, { $id: hash.encode(this.OP_COUNT)}))
      break;
      default:
        return Immutable.fromJS(Object.assign({}, this.OP, override, { $plugin: type, $id: hash.encode(this.OP_COUNT) }))
      break;
    }
  }
}

Defaults.OP_COUNT = -1;

Defaults.OP = {
  $name: 'blank',
  $log: 'blank',
  $skip: false,
  $halt: false,
  $before: [],
  $beforeEach: [],
  $plugin: 'blank',
  $op: 'blank',
  $timeout: 5000,
  $args: [],
  $payload: {},
  $afterEach: [],
  $after: []
}

Defaults.OPS = {
  $name: 'blank',
  $log: 'blank',
  $skip: false,
  $halt: false,
  $before: [],
  $beforeEach: [],
  $ops: [],
  $afterEach: [],
  $after: []
}
