import { createAction } from '@ngrx/store';
import { UserModel } from 'src/app/shared/models';

export const getStatusSuccess = createAction(
  '[Auth/API] Get Status Success',
  (user: UserModel | null) => ({ user })
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  (user: UserModel) => ({ user })
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  (error: string) => ({ error })
);
