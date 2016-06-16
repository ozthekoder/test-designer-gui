import Immutable from 'immutable'
import uuid from 'uuid'

export function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

export function isJsonSafePrimitive(value) {
  return (
    typeof value === 'number' ||
      typeof value === 'string' ||
      typeof value === 'boolean'
  );
};

export function saveOperations(op) {
  const ops = Immutable.fromJS(JSON.parse(localStorage.getItem('operations') || '{}'));
  if(op.get('$lookup')) {
    localStorage.setItem('operations', JSON.stringify(ops.set(op.get('$id'), op).toJS()));
  }
    const recursive = [
      '$before',
      '$beforeEach',
      '$ops',
      '$afterEach',
      '$after'
    ];

    recursive.forEach((k) => op.get(k, Immutable.List()).forEach(saveOperations))

}

export function copyFrom(operation) {
    let newOp = operation.merge(Immutable.Map({ $id: uuid.v4(), $lookup: false }));
    const recursive = [
      '$before',
      '$beforeEach',
      '$ops',
      '$afterEach',
      '$after'
    ]

    recursive
    .forEach((k) => {
      newOp = newOp.set(k, newOp.get(k, Immutable.List()).map(copyFrom))
    })

    return newOp;
}

export function generateAssertions(json, path=[]) {
  const keys = Object.keys(json);
  const length = keys.length;
  const $assert = 'equal';
  let expect = [];
  let $log;
  for(let i = 0; i < length; i++) {
    const key = keys[i];
    const $path = [...path, key];
    const $value = json[key];
    if (isJsonSafePrimitive($value)) {
      expect.push({
        $path,
        $value,
        $assert
      });
    } else {
      expect = [...expect, ...generateAssertions($value, $path)];
    }
  }

  return expect;
};

export function getAllAssertions(actual, expectation) {
  let tests = [];

  if (expectation.$assert && expectation.$value) {
    tests.push({
      expectation: expectation.$value,
      actual: actual,
      assertion: expectation.$assert,
      log: expectation.$log
    });
  } else {
    const keys = Object.keys(expectation);
    const length = keys.length;

    for(var i = 0; i < length; i++) {
      tests = tests.concat(getAllAssertions((actual ? actual[keys[i]] : null), expectation[keys[i]]));
    }
  }
  return tests;
};

export function getLookupList (path=[], tree) {
  let before = tree
  .get('$before')
  .filter((op) => !op.get('$lookup'))
  .map((op, index) =>{
    return getLookupList([...path, '$before', index], op)
  })

  if(before.size > 0) {
    before = before.reduce((prev, next) => prev.merge(next))
  }
  let after = tree
  .get('$after')
  .filter((op) => !op.get('$lookup'))
  .map((op, index) =>{
    return getLookupList([...path, '$after', index], op)
  })
  if(after.size > 0) {
    after = after.reduce((prev, next) => prev.merge(next))
  }

  let beforeEach = tree
  .get('$beforeEach')
  .filter((op) => !op.get('$lookup'))
  .map((op, index) =>{
    return getLookupList([...path, '$beforeEach', index], op)
  })
  if(beforeEach.size > 0) {
    beforeEach = beforeEach.reduce((prev, next) => prev.merge(next))
  }

  let afterEach = tree
  .get('$afterEach')
  .filter((op) => !op.get('$lookup'))
  .map((op, index) =>{
    return getLookupList([...path, '$afterEach', index], op)
  })
  if(afterEach.size > 0) {
    afterEach = afterEach.reduce((prev, next) => prev.merge(next))
  }

  let ops = tree
  .get('$ops', Immutable.List())
  .filter((op) => !op.get('$lookup'))
  .map((op, index) =>{
    return getLookupList([...path, '$ops', index], op)
  })
  if(ops.size > 0) {
    ops = ops.reduce((prev, next) => prev.merge(next))
  }
  return Immutable.Map({ [path.join('.')]: tree.get('$name').replace(/ /g, '_') })
  .merge(before)
  .merge(beforeEach)
  .merge(ops)
  .merge(afterEach)
  .merge(after)
}
