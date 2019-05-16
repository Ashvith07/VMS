/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import visitorManagementSystemReducer from '../containers/VisitorManagementSystem/reducer';
import history from './history';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

  export const rootReducer = combineReducers({
  //  language: languageProviderReducer,
    visitor:visitorManagementSystemReducer,
    router: connectRouter(history),
    // router: connectRouter(history),
    // ...injectedReducers,
  });

  // return rootReducer;

