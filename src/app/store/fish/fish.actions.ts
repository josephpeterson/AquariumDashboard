import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Fish } from 'src/app/models/Fish';
import { Update } from '@ngrx/entity';

export enum FishActions {
  AddFish = '[Fish] AddFish',
  AddFishSuccess = '[Fish] AddFishSuccess',
  AddFishFail = '[Fish] AddFishFail',

  LoadFishById = '[Fish] Load fish by FishId',
  LoadFishSuccess = '[Fish] LoadFishSuccess',
  LoadFishFail = '[Fish] LoadAllFishFail',

  

  UpdateFish = '[Fish] UpdateFish',
  UpdateFishSuccess = '[Fish] UpdateFishSuccess',
  UpdateFishFail = '[Fish] UpdateFishFail',

  DeleteFish = '[Fish] DeleteFish',
  DeleteFishSuccess = '[Fish] DeleteFishSuccess',
  DeleteFishFail = '[Fish] DeleteFishFail',

  SelectFish = '[Fish] SelectFish',

  Reset = '[Fish] Reset',
}

/* Retrieving */
export class FishLoadByIdAction implements Action {
  readonly type = FishActions.LoadFishById
  constructor(public payload: number) { }
}
export class FishLoadSuccessAction implements Action {
  readonly type = FishActions.LoadFishSuccess
  constructor(public payload: Fish[]) { }
}
export class FishLoadFailAction implements Action {
  readonly type = FishActions.LoadFishFail
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
  constructor(public payload: HttpErrorResponse) {}
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

export class FishSelectAction implements Action {
  readonly type = FishActions.SelectFish
  constructor(public payload: number) {
  }
}
export class FishResetAction implements Action {
  readonly type = FishActions.Reset
}
export type AllFishActions =
  FishLoadByIdAction |
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

  FishSelectAction |

  FishResetAction;