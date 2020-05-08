import { combineReducers } from 'redux';
import formReducer from './form/reducer';

export * from './form/actions';

export default combineReducers({
  formReducer,
});
