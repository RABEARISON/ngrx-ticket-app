import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import * as fromUser from './user.reducer';
import {EffectsModule} from '@ngrx/effects';
import {UsersEffects} from './user.effect';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    MatDialogModule,
    StoreModule.forFeature('user', fromUser.reducer),
    EffectsModule.forFeature([UsersEffects])
  ]
})
export class UserStore { }
