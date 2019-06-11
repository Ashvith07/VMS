
import { applyMiddleware, compose, createStore } from 'redux'
// import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import {throttle} from 'lodash';


// import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from 'redux-logger'
import visitorManagementSystemSaga from '../containers/VisitorManagementSystem/saga';
import { rootReducer } from './reducers';
import { saveTolocalStorage, loadFromLocalStorage } from './localStorage';
const sagaMiddleware = createSagaMiddleware()
const persistedState = loadFromLocalStorage()

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, persistedState, composedEnhancers)

  sagaMiddleware.run(visitorManagementSystemSaga)

  store.subscribe(throttle(() => {
    saveTolocalStorage({
      visitor:store.getState().visitor
    });
  }, 1000));

  return store
}