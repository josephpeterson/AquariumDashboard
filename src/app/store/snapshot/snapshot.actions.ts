import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Snapshot } from '../../models/Snapshot';
import { Aquarium } from 'src/app/models/Aquarium';

export enum SnapshotActions {
  LoadByAquarium = '[Snapshot] LoadByAquarium',
  LoadSuccess = '[Snapshot] LoadSuccess',
  LoadFailed = '[Snapshot] LoadFailed',

  Delete = '[Snapshot] Delete',
  DeleteSuccess = '[Snapshot] DeleteSuccess',
  DeleteFail = '[Snapshot] DeleteFail',

  Take = '[Snapshot] Take',
  TakeSuccess = '[Snapshot] TakeSuccess',
  TakeFail = '[Snapshot] TakeFail',

  Reset = '[Snapshot] Reset',
}

export class SnapshotLoadByAquariumAction implements Action {
  readonly type = SnapshotActions.LoadByAquarium
  constructor(public payload: number) { }
}
export class SnapshotLoadSuccessAction implements Action {
  readonly type = SnapshotActions.LoadSuccess
  constructor(public payload: Snapshot[]) { }
}
export class SnapshotLoadFailedAction implements Action {
  readonly type = SnapshotActions.LoadFailed
  constructor(public payload: HttpErrorResponse) { }
}
export class SnapshotDeleteAction implements Action {
  readonly type = SnapshotActions.Delete
  constructor(public payload: Snapshot) { }
}
export class SnapshotDeleteSuccessAction implements Action {
  readonly type = SnapshotActions.DeleteSuccess
  constructor(public payload: Snapshot) { }
}
export class SnapshotDeleteFailedAction implements Action {
  readonly type = SnapshotActions.DeleteFail
  constructor(public payload: HttpErrorResponse) { }
}
export class SnapshotResetAction implements Action {
  readonly type = SnapshotActions.Reset
}
export class SnapshotTakeAction implements Action {
  readonly type = SnapshotActions.Take
  constructor(public payload: Aquarium) { }
}
export class SnapshotTakeSuccessAction implements Action {
  readonly type = SnapshotActions.TakeSuccess
  constructor(public payload: Snapshot) { }
}
export class SnapshotTakeFailedAction implements Action {
  readonly type = SnapshotActions.TakeFail
  constructor(public payload: HttpErrorResponse) { }
}
export type AllSnapshotActions =
  SnapshotLoadByAquariumAction |
  SnapshotLoadSuccessAction |
  SnapshotLoadFailedAction |

  SnapshotDeleteAction |
  SnapshotDeleteFailedAction |
  SnapshotDeleteSuccessAction |

  SnapshotTakeAction |
  SnapshotTakeSuccessAction |
  SnapshotTakeFailedAction |

  SnapshotResetAction;