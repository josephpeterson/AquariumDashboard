import { Action } from '@ngrx/store';
import { Aquarium } from 'src/app/models/Aquarium';
import { Update } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';

export enum AquariumActions {
  Update = '[Aquariums] Tank updated',
  UpdateSuccess = '[Aquariums] Tank was updated',
  UpdateFail = '[Aquariums] Tank failed to update',

  Load = '[Aquariums] Load',
  LoadSuccess = '[Aquariums] Load Success',
  LoadFail = '[Aquariums] Load Failure',

  Create = '[Aquariums] Create',
  CreateSuccess = '[Aquariums] CreateSuccess',
  CreateFail = '[Aquariums] CreateFail',
  CreateReset = '[Aquariums] CreateReset',

  MakeSelection = '[Aquariums] Tank Selected',
  Increment = '[Counter Component] Increment',
  Decrement = '[Counter Component] Decrement',
  Reset = '[Counter Component] Reset',
}


export class AquariumListAction implements Action {
  readonly type = AquariumActions.Load
}
export class AquariumLoadSuccessAction implements Action {
  readonly type = AquariumActions.LoadSuccess
  constructor(public payload: any[]) {

  }
}
export class AquariumLoadFailAction implements Action {
  readonly type = AquariumActions.LoadFail
  constructor(public payload: any[]) {

  }
}
export class AquariumSelectionAction implements Action {
  readonly type = AquariumActions.MakeSelection
  constructor(public aquariumId: number) {
  }
}
export class AquariumUpdateAction implements Action {
  readonly type = AquariumActions.Update
  constructor(public aquarium: Aquarium) {
  }
}
export class AquariumUpdateSuccessAction implements Action {
  readonly type = AquariumActions.UpdateSuccess
  constructor(public aquarium: Update<Aquarium>) {
  }
}
export class AquariumUpdateFailAction implements Action {
  readonly type = AquariumActions.UpdateFail
  constructor(public payload: string) {
  }
}




/* Create Aquarium Dialog */
export class AquariumCreateAction implements Action {
  readonly type = AquariumActions.Create
  constructor(public payload: Aquarium) {
  }
}
export class AquariumCreateSuccessAction implements Action {
  readonly type = AquariumActions.CreateSuccess
  constructor(public payload: Aquarium) {
  }
}
export class AquariumCreateFailAction implements Action {
  readonly type = AquariumActions.CreateFail
  constructor(public payload: HttpErrorResponse) {
  }
}
export class AquariumCreateResetAction implements Action {
  readonly type = AquariumActions.CreateReset
}


export type AllAquariumActions =
  AquariumCreateResetAction |
  AquariumCreateFailAction |
  AquariumCreateAction |
  AquariumUpdateSuccessAction |
  AquariumUpdateFailAction |
  AquariumSelectionAction |
  AquariumListAction |
  AquariumLoadSuccessAction |
  AquariumCreateSuccessAction |
  AquariumLoadFailAction;