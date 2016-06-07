import config from '../../../config';
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
export const LOG_DEFAULT_PLUGINS = 'LOG_DEFAULT_PLUGINS'
export const ADD_NEW_NODE = 'ADD_NODE'
export const REMOVE_NODE = 'REMOVE_NODE'

// ------------------------------------
// Actions
// ------------------------------------
export function addNewNode (type, parentId, collection) {
  return {
    type: ADD_NEW_NODE,
    payload: {
      type,
      parentId,
      collection
    }
  }
}

export const actions = {
  addNewNode,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_NEW_NODE]: (state, action) => {
    let s = Object.assign({}, state)
    const { type, parentId, collection } = action.payload
    const addNode = (node) => {
      if(node.$id === parentId) {
        node[collection].push(config.Defaults.blueprint(type))
      } else {
        recursive
        .map((k) => node[k])
        .forEach(addNode)
      }
    }
    addNode(s.inContext)
    return s;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  inContext:config.Defaults.blueprint('multiple'),
  plugins: config.plugins
}

export default function editorReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
