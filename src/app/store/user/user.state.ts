import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {User} from "../../../interfaces/user.interface";

export interface UserState extends EntityState<User>{
  loading: boolean;
  loaded: boolean;
  errorMessage: any;
}

export const UserAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (entry) => entry.id
});

export const UserInitialState: UserState = UserAdapter.getInitialState({
  loaded: false,
  loading: false,
  errorMessage: undefined
});
