import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Fish } from 'src/app/models/Fish';
import { Update } from '@ngrx/entity';

export enum FishActions {
  LoadFishByAquariumId = '[Fish] Load fish by AquariumId',
  LoadFishByFishId = '[Fish] Load fish by FishId',
  LoadFishSuccess = '[Fish] LoadFishSuccess',
  LoadAllFishFail = '[Fish] LoadAllFishFail',

  AddFish = '[Fish] AddFish',
  AddFishSuccess = '[Fish] AddFishSuccess',
  AddFishFail = '[Fish] AddFishFail',

  UpdateFish = '[Fish] UpdateFish',
  UpdateFishSuccess = '[Fish] UpdateFishSuccess',
  UpdateFishFail = '[Fish] UpdateFishFail',

  DeleteFish = '[Fish] DeleteFish',
  DeleteFishSuccess = '[Fish] DeleteFishSuccess',
  DeleteFishFail = '[Fish] DeleteFishFail',

  Reset = '[Fish] Reset',
}

/* Loading */
export class FishLoadByAquariumIdAction implements Action {
  readonly type = FishActions.LoadFishByAquariumId
  constructor(public payload: number) { }
}
export class FishLoadByFishIdAction implements Action {
  readonly type = FishActions.LoadFishByFishId
  constructor(public payload: number) { }
}
export class FishLoadSuccessAction implements Action {
  readonly type = FishActions.LoadFishSuccess
  constructor(public payload: Fish[]) { }
}
export class FishLoadFailAction implements Action {
  readonly type = FishActions.LoadAllFishFail
  constructor(public payload: HttpErrorResponse) { }
}

/* Creating Fish */
export class FishAddAction implements Action {
  readonly type = FishActions.AddFish
  constructor(public payload: Fish) { }
}
export class FishAddSuccessAction implements Action {
  readonly type = FishActions.AddFishSuccess
  constructor(public payload: Fish) { }
}
export class FishAddFailAction implements Action {
  readonly type = FishActions.AddFishFail
  constructor(public payload: HttpErrorResponse) { }
}

/* Updating Fish */
export class FishUpdateAction implements Action {
  readonly type = FishActions.UpdateFish
  constructor(public payload: Fish) { }
}
export class FishUpdateSuccessAction implements Action {
  readonly type = FishActions.UpdateFishSuccess
  constructor(public payload: Update<Fish>) { }
}
export class FishUpdateFailAction implements Action {
  readonly type = FishActions.UpdateFishFail
  constructor(public payload: HttpErrorResponse) { }
}

/* Deleting Fish */
export class FishDeleteAction implements Action {
  readonly type = FishActions.DeleteFish
  constructor(public payload: Fish) { }
}
export class FishDeleteSuccessAction implements Action {
  readonly type = FishActions.DeleteFishSuccess
  constructor(public payload: Fish) { }
}
export class FishDeleteFailAction implements Action {
  readonly type = FishActions.DeleteFishFail
  constructor(public payload: HttpErrorResponse) { }
}

export class FishResetAction implements Action {
  readonly type = FishActions.Reset
}
export type AllFishActions =
  FishLoadByAquariumIdAction |
  FishLoadByFishIdAction |
  FishLoadSuccessAction |
  FishLoadFailAction |

  FishAddAction |
  FishAddSuccessAction |
  FishAddFailAction |

  FishUpdateAction |
  FishUpdateSuccessAction |
  FishUpdateFailAction |

  FishDeleteAction |
  FishDeleteSuccessAction |
  FishDeleteFailAction |

  FishResetAction;