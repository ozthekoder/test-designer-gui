import config from '../../../config';
// ------------------------------------
// Constants
// ------------------------------------
export const LOG_DEFAULT_PLUGINS = 'LOG_DEFAULT_PLUGINS'

// ------------------------------------
// Actions
// ------------------------------------
export function logDefaultPlugins () {
  return {
    type: LOG_DEFAULT_PLUGINS,
    payload: null
  }
}

export const actions = {
  logDefaultPlugins,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOG_DEFAULT_PLUGINS]: (state, action) => {
    console.log(state.plugins);
    return state;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  inContext: {

  },
  plugins: config.plugins
}

export default function editorReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
