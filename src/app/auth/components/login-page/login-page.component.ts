import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/shared/models';
import { AuthUserActions } from '../../actions';
import { LoginEvent } from '../login-form';
import {
  selectAuthError,
  selectAuthGettingStatus,
  selectAuthUser,
  State,
} from 'src/app/shared/state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  gettingStatus$: Observable<boolean> = this.store.select(
    selectAuthGettingStatus
  );
  user$: Observable<UserModel | null> = this.store.select(selectAuthUser);
  error$: Observable<string | null> = this.store.select(selectAuthError);

  constructor(private store: Store<State>) {}

  onLogin($event: LoginEvent) {
    this.store.dispatch(
      AuthUserActions.login($event.username, $event.password)
    );
  }
}
