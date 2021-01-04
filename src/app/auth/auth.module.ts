import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { LoginPageComponentModule } from './components/login-page';
import { UserComponentModule } from './components/user';

@NgModule({
  exports: [LoginPageComponentModule, UserComponentModule],
  imports: [EffectsModule.forFeature([AuthEffects])],
})
export class AuthModule {}
