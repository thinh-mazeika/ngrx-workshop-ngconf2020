import { UserModel } from '../models';
import { Action, createReducer, on } from '@ngrx/store';
import { AuthApiActions, AuthUserActions } from 'src/app/auth/actions';

export interface State {
  gettingStatus: boolean;
  user: UserModel | null;
  error: string | null;
}

export const initialState: State = {
  gettingStatus: true,
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthUserActions.logout, (state, action) => {
    return {
      ...state,
      gettingStatus: false,
      user: null,
      error: null,
    };
  }),
  on(AuthUserActions.login, (state, action) => {
    return {
      ...state,
      gettingStatus: true,
      user: null,
      error: null,
    };
  }),
  on(AuthApiActions.getStatusSuccess, (state, action) => {
    return {
      ...state,
      gettingStatus: false,
      user: action.user,
      error: null,
    };
  }),
  on(AuthApiActions.loginSuccess, (state, action) => {
    return {
      ...state,
      gettingStatus: false,
      user: action.user,
      error: null,
    };
  }),
  on(AuthApiActions.loginFailure, (state, action) => {
    return {
      ...state,
      gettingStatus: false,
      user: null,
      error: action.error,
    };
  })
);

export function reducer(state: undefined | State, action: Action) {
  return authReducer(state, action);
}

/*Getter Selector*/
export const selectGettingStatus = (state: State) => state.gettingStatus;
export const selectUser = (state: State) => state.user;
export const selectError = (state: State) => state.error;
