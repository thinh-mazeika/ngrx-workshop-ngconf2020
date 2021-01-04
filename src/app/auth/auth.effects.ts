import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { AuthApiActions, AuthUserActions } from './actions';

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService, private actions$: Actions) {}

  getAuthStatus$ = createEffect(() => {
    return this.authService
      .getStatus()
      .pipe(map((userOrNull) => AuthApiActions.getStatusSuccess(userOrNull)));
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthUserActions.login),
      concatMap((action) => {
        return this.authService.login(action.username, action.password).pipe(
          map((user) => AuthApiActions.loginSuccess(user)),
          catchError((error) => of(AuthApiActions.loginFailure(error)))
        );
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthUserActions.logout),
        tap(() => {
          this.authService.logout();
        })
      );
    },
    { dispatch: false }
  );
}
