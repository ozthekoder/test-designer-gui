import config from '../../../config';
import Immutable from 'immutable'

const recursive = [
  '$before',
  '$beforeEach',
  '$ops',
  '$afterEach',
  '$after'
]

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_NEW_NODE = 'ADD_NEW_NODE'
export const REMOVE_NODE = 'REMOVE_NODE'
export const SET_CONTEXT = 'SET_CONTEXT'
export const SET_OP_NAME = 'SET_OP_NAME'

// ------------------------------------
// Actions
// ------------------------------------
export function addNewNode ({ type, path }) {
  return {
    type: ADD_NEW_NODE,
    payload: {
      type,
      path
    }
  }
}

export function setContext (path) {
  return {
    type: SET_CONTEXT,
    payload: {
      path
    }
  }
}

export function setOpName (name) {
  return {
    type: SET_OP_NAME,
    payload: {
      name
    }
  }
}

export const actions = {
  addNewNode,
  setContext,
  setOpName
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_NEW_NODE]: (state, action) => {
    const { type, path } = action.payload
    const s = { ...state }
    const merge = Immutable.List([config.Defaults.blueprint(type)]);
    const { blueprint, inContext } = s
    s.blueprint = blueprint.mergeIn(path, merge)
    console.log(s.blueprint.toJS())
    return s
  },
  [SET_CONTEXT]: (state, action) => {
    const { path } = action.payload
    const s = { ...state };
    s.inContext = [...path];
    return s
  },
  [SET_OP_NAME]: (state, action) => {
    const { name } = action.payload
    const s = { ...state }
    const { blueprint, inContext } = s
    s.blueprint = blueprint.setIn([...inContext, '$name'], name)
    return s
  }

}

// ------------------------------------
// Reducer
// ------------------------------------
const blueprint = config.Defaults.blueprint('multiple');
const initialState = {
  blueprint,
  inContext: [],
  plugins: config.plugins
};

export default function editorReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
