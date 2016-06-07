import uuid from 'uuid'
import plugins from '../plugins';

export default class Defaults {
  static blueprint(type, override = {}) {
    switch (type) {
      case 'single':
        return Object.assign(this.OP, override, { $id: uuid.v4() })
      break;
      case 'multiple':
      default:
        return Object.assign(this.OPS, override, { $id: uuid.v4() })
      break;
    }
  }

  static operation($plugin, $op='blank', override = {}) {
    return this.blueprint('single', Object.assign({ $plugin, $op }, override)
)
  }
}

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
