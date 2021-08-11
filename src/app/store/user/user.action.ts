import {createAction, props} from '@ngrx/store';
import {User} from "../../../interfaces/user.interface";

const source = 'user';

export const UserLoadRequested = createAction(
  `[${source}] load requested`
);

export const UserRequestedSuccess = createAction(
  `[${source}] loaded`,
  props<{ users: User[] }>()
);

export const UserRequestedFailure = createAction(
  `[${source}] load failed`,
  props<{ errorMessage: string }>()
);
