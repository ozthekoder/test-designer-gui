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
export const UPDATE_CONFIG = 'UPDATE_CONFIG'
export const TOGGLE_PLUGIN = 'TOGGLE_PLUGIN'
export const ADD_PLUGIN = 'ADD_PLUGIN'
export const UPLOAD_JSON = 'UPLOAD_JSON'
export const COPY_NODE = 'COPY_NODE'


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

export function removeNode (path) {
  return {
    type: REMOVE_NODE,
    payload: {
      path
    }
  }
}

export function copyNode (path, op) {
  return {
    type: COPY_NODE,
    payload: {
      op,
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

export function updateConfig (path, value) {
  return {
    type: UPDATE_CONFIG,
    payload: {
      path,
      value
    }
  }
}

export function togglePlugin (plugin, value) {
  return {
    type: TOGGLE_PLUGIN,
    payload: {
      plugin,
      value
    }
  }
}

export function addPlugin (plugin) {
  return {
    type: ADD_PLUGIN,
    payload: {
      plugin
    }
  }
}

export function uploadJSON (json) {
  return {
    type: UPLOAD_JSON,
    payload: {
      json
    }
  }
}

export const actions = {
  addNewNode,
  setContext,
  setOpAttribute,
  updateConfig,
  addPlugin,
  uploadJSON,
  copyNode,
  removeNode
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
    if(value) {
      s.blueprint = blueprint.setIn([...inContext, ...attr], value)
    } else {
      const path = [...inContext]
      s.inContext = []
      s.blueprint = blueprint.deleteIn([...path, ...attr])
    }
    return s
  },
  [UPDATE_CONFIG]: (state, action) => {
    const { path, value } = action.payload
    const s = { ...state }
    s.config = state.config.setIn(path, value)
    return s;
  },
  [TOGGLE_PLUGIN]: (state, action) => {
    const { plugin, value } = action.payload
    const s = { ...state }
    s.plugins = s.plugins.setIn([plugin, '$active'], value)
    return s;
  },
  [ADD_PLUGIN]: (state, action) => {
    const { plugin } = action.payload
    const s = { ...state }
    s.plugins = s.plugins.set(plugin.$plugin_name, Immutable.fromJS(plugin))
    return s;
  },
  [UPLOAD_JSON]: (state, action) => {
    const { json } = action.payload
    const s = { ...state }
    s.blueprint = Immutable.fromJS(json.test)
    s.config = Immutable.fromJS(json.config)
    s.inContext = []
    return s;
  },
  [COPY_NODE]: (state, action) => {
    const { path, op } = action.payload
    const s = { ...state }
    s.blueprint = s.blueprint.updateIn(path, Immutable.List(), (list) => list.push(op))
    return s;
  },
  [REMOVE_NODE]: (state, action) => {
    const { path } = action.payload
    const s = { ...state }
    s.inContext = [];
    s.blueprint = s.blueprint.deleteIn([...path])
    return s;
  }

}

// ------------------------------------
// Reducer
// ------------------------------------
const blueprint = config.Defaults.blueprint('multiple');
const initialState = {
  blueprint,
  inContext: [],
  plugins: Immutable.fromJS(config.plugins),
  config: config.Defaults.configuration()
};

export default function editorReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
