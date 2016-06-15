import Immutable from 'immutable'

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

export function getLookupList (list=Immutable.List(), blueprint) {
  return;
}
