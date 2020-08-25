import { createReducer } from 'typesafe-actions';
import { UserState, UserAction } from './types';
import { asyncState } from 'lib/reducerUtils';
import {
  USER_ME,
  USER_ME_SUCCESS,
  USER_ME_ERROR,
  TEMP_SET_USER,
} from './actions';

const initialState: UserState = {
  userMeResponse: asyncState.initial(),
  tempUser: null
};

const user = createReducer<UserState, UserAction>(initialState, {
  [TEMP_SET_USER]: (state, action) => ({
    ...state,
    tempUser: action.payload
  }),
  [USER_ME]: (state) => ({
    ...state,
    userMeResponse: asyncState.load(),
  }),
  [USER_ME_SUCCESS]: (state, action) => ({
    ...state,
    userMeResponse: asyncState.success(action.payload),
  }),
  [USER_ME_ERROR]: (state, action) => ({
    ...state,
    userMeResponse: asyncState.error(action.payload),
  }),
});

export default user;
