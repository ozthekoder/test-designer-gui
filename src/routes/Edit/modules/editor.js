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
export const SET_OP_ATTRIBUTE = 'SET_OP_ATTRIBUTE'

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

export function setOpAttribute (attribute, value) {
  return {
    type: SET_OP_ATTRIBUTE,
    payload: {
      attribute,
      value
    }
  }
}

export const actions = {
  addNewNode,
  setContext,
  setOpAttribute
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_NEW_NODE]: (state, action) => {
    const { type, path } = action.payload
    const s = { ...state }
    const toAdd = config.Defaults.blueprint(type);
    const { blueprint, inContext } = s
    s.blueprint = blueprint.updateIn(path, Immutable.List(), (list) => list.push(toAdd))
    return s
  },
  [SET_CONTEXT]: (state, action) => {
    const { path } = action.payload
    const s = { ...state };
    s.inContext = [...path];
    return s
  },
  [SET_OP_ATTRIBUTE]: (state, action) => {
    const { attribute, value } = action.payload
    const attr = Array.isArray(attribute) ? attribute : [attribute]
    const s = { ...state }
    const { blueprint, inContext } = s
    s.blueprint = blueprint.setIn([...inContext, ...attr], value)
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
