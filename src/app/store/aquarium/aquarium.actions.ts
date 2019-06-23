import { Action } from '@ngrx/store';
import { Aquarium } from 'src/app/models/Aquarium';
import { Update } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { Fish } from 'src/app/models/Fish';

export enum AquariumActions {
  Update = '[Aquariums] Tank updated',
  UpdateSuccess = '[Aquariums] Tank was updated',
  UpdateFail = '[Aquariums] Tank failed to update',

  Load = '[Aquariums] Load',
  LoadById = '[Aquariums] Load by id',
  LoadSuccess = '[Aquariums] Load Success',
  LoadFail = '[Aquariums] Load Failure',

  Create = '[Aquariums] Create',
  CreateSuccess = '[Aquariums] CreateSuccess',
  CreateFail = '[Aquariums] CreateFail',
  CreateReset = '[Aquariums] CreateReset',

  Delete = '[Aquariums] Delete',
  DeleteSuccess = '[Aquariums] DeleteSuccess',
  DeleteFail = '[Aquariums] DeleteFail',

  MakeSelection = '[Aquariums] Tank Selected',
  Unselect = '[Aquariums] Tank Unselected',


  AddFish = '[Aquariums] AddFish',
  AddFishFail = '[Aquariums] AddFishFail',
  AddFishSuccess = '[Aquariums] AddFishSuccess',

  UpdateFish = '[Aquariums] UpdateFish',
  UpdateFishFail = '[Aquariums] UpdateFishFail',
  UpdateFishSuccess = '[Aquariums] UpdateFishSuccess',

  DeleteFish = '[Aquariums] DeleteFish',
  DeleteFishFail = '[Aquariums] DeleteFishFail',
  DeleteFishSuccess = '[Aquariums] DeleteFishSuccess',

  Decrement = '[Counter Component] Decrement',
  Reset = '[Counter Component] Reset',
}


export class AquariumListAction implements Action {
  readonly type = AquariumActions.Load
}
export class AquariumLoadByIdAction implements Action {
  readonly type = AquariumActions.LoadById
  constructor(public payload: number) { }
}
export class AquariumLoadSuccessAction implements Action {
  readonly type = AquariumActions.LoadSuccess
  constructor(public payload: any[]) {

  }
}
export class AquariumLoadFailAction implements Action {
  readonly type = AquariumActions.LoadFail
  constructor(public payload: HttpErrorResponse) {

  }
}







export class AquariumSelectionAction implements Action {
  readonly type = AquariumActions.MakeSelection
  constructor(public aquariumId: number) {
  }
}
export class AquariumUnSelectionAction implements Action {
  readonly type = AquariumActions.Unselect
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
  constructor(public payload: HttpErrorResponse) {
  }
}










export class AquariumAddFishAction implements Action {
  readonly type = AquariumActions.AddFish
  constructor(public payload: Fish) {
  }
}
export class AquariumAddFishSuccessAction implements Action {
  readonly type = AquariumActions.AddFishSuccess
  constructor(public payload: Fish) {
  }
}
export class AquariumAddFishFailAction implements Action {
  readonly type = AquariumActions.AddFishFail
  constructor(public payload: HttpErrorResponse) {
  }
}




export class AquariumUpdateFishAction implements Action {
  readonly type = AquariumActions.UpdateFish
  constructor(public payload: Fish) {
  }
}
export class AquariumUpdateFishSuccessAction implements Action {
  readonly type = AquariumActions.UpdateFishSuccess
  constructor(public payload: Fish) {
  }
}
export class AquariumUpdateFishFailAction implements Action {
  readonly type = AquariumActions.UpdateFishFail
  constructor(public payload: HttpErrorResponse) {
  }
}







export class AquariumDeleteFishAction implements Action {
  readonly type = AquariumActions.DeleteFish
  constructor(public payload: Fish) {
  }
}
export class AquariumDeleteFishSuccessAction implements Action {
  readonly type = AquariumActions.DeleteFishSuccess
  constructor(public payload: Update<Fish>) {
  }
}
export class AquariumDeleteFishFailAction implements Action {
  readonly type = AquariumActions.DeleteFishFail
  constructor(public payload: HttpErrorResponse) {
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

/* Delete Aquarium */
export class AquariumDeleteAction implements Action {
  readonly type = AquariumActions.Delete
  constructor(public payload: Aquarium) {
  }
}
export class AquariumDeleteSuccessAction implements Action {
  readonly type = AquariumActions.DeleteSuccess
  constructor(public payload: Aquarium) {
  }
}
export class AquariumDeleteFailAction implements Action {
  readonly type = AquariumActions.DeleteFail
  constructor(public payload: HttpErrorResponse) {
  }
}
export class AquariumResetAction implements Action {
  readonly type = AquariumActions.Reset
}

export type AllAquariumActions =
  AquariumResetAction |
  AquariumCreateResetAction |
  AquariumCreateFailAction |
  AquariumCreateSuccessAction |
  AquariumCreateAction |

  AquariumDeleteAction |
  AquariumDeleteFailAction |
  AquariumDeleteSuccessAction |

  AquariumUpdateAction |
  AquariumUpdateSuccessAction |
  AquariumUpdateFailAction |

  AquariumSelectionAction |
  AquariumUnSelectionAction |
  AquariumListAction |
  AquariumLoadByIdAction |

  AquariumAddFishAction |
  AquariumAddFishSuccessAction |
  AquariumAddFishFailAction |

  AquariumUpdateFishAction |
  AquariumUpdateFishSuccessAction |
  AquariumUpdateFishFailAction |

  AquariumDeleteFishAction |
  AquariumDeleteFishSuccessAction |
  AquariumDeleteFishFailAction |

  AquariumLoadSuccessAction |
  AquariumLoadFailAction;