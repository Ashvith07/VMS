
import { applyMiddleware, compose, createStore } from 'redux'
// import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'


// import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from 'redux-logger'
import visitorManagementSystemSaga from '../containers/VisitorManagementSystem/saga';
import { rootReducer } from './reducers';
const sagaMiddleware = createSagaMiddleware()



export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  sagaMiddleware.run(visitorManagementSystemSaga)

  return store
}