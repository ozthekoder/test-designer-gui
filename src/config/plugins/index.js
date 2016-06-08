import Immutable from 'immutable'
import wait from './wait.json'
import http from './http.json'
import kafka from './kafka.json'

export default Immutable.fromJS({
  wait,
  http,
  kafka
})
