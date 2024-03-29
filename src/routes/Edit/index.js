import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'edit',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Editor = require('./containers/EditorContainer').default
      //const AddOpMenu = require('./containers/AddOpMenuContainer').default

      const reducer = require('./modules/editor').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'editor', reducer })

      /*  Return getComponent   */
      cb(null, Editor)

    /* Webpack named bundle   */
    }, 'editor')
  }
})
