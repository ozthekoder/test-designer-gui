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

export function setContext ({ op }) {
  return {
    type: ADD_NEW_NODE,
    payload: {
      op
    }
  }
}

export const actions = {
  addNewNode,
  setContext
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_NEW_NODE]: (state, action) => {
    const { type, path } = action.payload
    let b = state.blueprint.toJS()
    const collection = path.reduce((prev, current) => prev[current], b)
    collection.push(config.Defaults.blueprint(type))
    return Object.assign({}, state, {blueprint: Immutable.fromJS(b)})
  },
  [SET_CONTEXT]: (state, action) => {
    const { op } = action.payload
    return Object.assign({}, state, { inContext: op })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const blueprint = config.Defaults.blueprint('multiple');
const initialState = {
  blueprint: blueprint,
  inContext: blueprint,
  plugins: config.plugins
}

export default function editorReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
